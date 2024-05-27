package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"sort"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Scoreboard struct {
	Rank  string `json:"rank"`
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  int    `json:"time"`
}

func WSendpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}

		var result Scoreboard

		err = json.Unmarshal(msg, &result)
		if err != nil {
			log.Println("Error unmarshaling JSON:", err)
			continue
		}

		filePath := "../json/data.json"
		if err := updateScoreboard(filePath, result); err != nil {
			log.Println("Error updating scoreboard:", err)
			continue
		}

		scoreboards, err := readScoreboard(filePath)
		if err != nil {
			log.Println("Error reading scoreboard:", err)
			continue
		}

		scoreboardMsg, err := json.Marshal(scoreboards)
		if err != nil {
			log.Println("Error encoding scoreboard message:", err)
			continue
		}

		if err := conn.WriteMessage(websocket.TextMessage, scoreboardMsg); err != nil {
			log.Println("Error sending scoreboard message:", err)
			continue
		}
	}
}

func updateScoreboard(filePath string, newScore Scoreboard) error {
	var scoreboards []Scoreboard

	data, err := os.ReadFile(filePath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("error reading scoreboard file: %v", err)
	}

	if data != nil {
		if err := json.Unmarshal(data, &scoreboards); err != nil {
			return fmt.Errorf("error unmarshaling scoreboard JSON: %v", err)
		}
	}

	scoreboards = append(scoreboards, newScore)
	scoreboards = rankScoreboard(scoreboards)

	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("error creating scoreboard file: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	if err := encoder.Encode(scoreboards); err != nil {
		return fmt.Errorf("error encoding scoreboard JSON: %v", err)
	}

	return nil
}

func rankScoreboard(scoreboards []Scoreboard) []Scoreboard {
	sort.Slice(scoreboards, func(i, j int) bool {
		return scoreboards[i].Score > scoreboards[j].Score
	})

	rank := 1
	prevScore := -1
	for i := range scoreboards {
		if scoreboards[i].Score != prevScore {
			switch rank {
			case 1:
				scoreboards[i].Rank = "1st"
			case 2:
				scoreboards[i].Rank = "2nd"
			case 3:
				scoreboards[i].Rank = "3rd"
			default:
				scoreboards[i].Rank = fmt.Sprintf("%dth", rank)
			}
			rank++
			prevScore = scoreboards[i].Score
		} else {
			scoreboards[i].Rank = "Not Classed"
		}
	}

	return scoreboards
}

func readScoreboard(filePath string) ([]Scoreboard, error) {
	var scoreboards []Scoreboard

	data, err := os.ReadFile(filePath)
	if err != nil && !os.IsNotExist(err) {
		return nil, fmt.Errorf("error reading scoreboard file: %v", err)
	}

	if data != nil {
		if err := json.Unmarshal(data, &scoreboards); err != nil {
			return nil, fmt.Errorf("error unmarshaling scoreboard JSON: %v", err)
		}
	}

	return scoreboards, nil
}

func main() {
	js := "../js"
	css := "../css"
	img := "../img"
	audio := "../audio"
	json := "../json"
	fonts := "../fonts"

	js_ser := http.FileServer(http.Dir(js))
	css_ser := http.FileServer(http.Dir(css))
	img_ser := http.FileServer(http.Dir(img))
	audio_ser := http.FileServer(http.Dir(audio))
	json_ser := http.FileServer(http.Dir(json))
	fonts_ser := http.FileServer(http.Dir(fonts))

	http.Handle("/js/", http.StripPrefix("/js/", js_ser))
	http.Handle("/css/", http.StripPrefix("/css/", css_ser))
	http.Handle("/img/", http.StripPrefix("/img/", img_ser))
	http.Handle("/audio/", http.StripPrefix("/audio/", audio_ser))
	http.Handle("/json/", http.StripPrefix("/json/", json_ser))
	http.Handle("/fonts/", http.StripPrefix("/fonts/", fonts_ser))

	http.HandleFunc("/", Homepage)
	http.HandleFunc("/get", WSendpoint)

	fmt.Println("http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

func Homepage(w http.ResponseWriter, r *http.Request) {
	// var result Scoreboard
	// username := r.FormValue("username")
	// result.Name = username

	// fmt.Println("username", username)
	Render(w)
}

func Render(w http.ResponseWriter) {
	tmpl, err := template.ParseFiles("../../index.html", "../../player.html")
	if err != nil {
		http.Error(w, "Error 404", http.StatusNotFound)
	}
	tmpl.ExecuteTemplate(w, "index.html", nil)
}
