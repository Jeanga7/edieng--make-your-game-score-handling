package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"

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

// / get the score of the players not the actual player
// func GetScoreBoard(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "GET" {

// 	} else {
// 		w.WriteHeader(http.StatusMethodNotAllowed)
// 	}
// }

func Fetchage() {
	resp, err := http.Get("http://localhost:8080/get")
	if err != nil {
		fmt.Println("Error making the HTTP request:", err)
		// return nil
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		fmt.Println("HTTP request returned a non-200 status code:", resp.Status)
		// return nil
	}
	body, err := io.ReadAll(resp.Body)
	// fmt.Println(string(body))
	if err != nil {
		fmt.Println("Error reading response body:", err)
		// return nil
	}
	fmt.Println(body)
}

func MarshallMather(w http.ResponseWriter, r *http.Request) {
	// jsonResponse, err := MarshalGeocodeResponse(res)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	// w.Header().Set("Content-Type", "application/json")
	// w.Write(jsonResponse)
}

func MarshalGeocodeResponse(response Scoreboard) ([]byte, error) {
	return json.Marshal(response)
}

// / put the score of the player
//
//	func PostScoreBoard(w http.ResponseWriter, r *http.Request) {
//		if r.Method == "POST" {
//			var Donnees Scoreboard
//			err := json.NewDecoder(r.Body).Decode(&Donnees)
//			if err != nil {
//				http.Error(w, err.Error(), http.StatusBadRequest)
//				return
//			}
//		} else {
//			w.WriteHeader(http.StatusMethodNotAllowed)
//		}
//	}
var Ws *websocket.Conn

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

		fmt.Println("this is msg", string(msg))

		err = json.Unmarshal(msg, &result)
		if err != nil {
			log.Println("Error unmarshaling JSON:", err)
			continue
		}

		fmt.Println("this is result", result)

		filePath := "../json/data.json"
		file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			fmt.Println("Erreur lors de l'ouverture du fichier :", err)
			return
		}
		defer file.Close()

		// Écriture dans le fichier
		_, err = file.Write(msg)
		if err != nil {
			fmt.Println("Erreur lors de l'écriture dans le fichier :", err)
			return
		}

		scoreboard := Scoreboard{
			Rank:  result.Rank,
			Score: result.Score,
			Name:  result.Name,
			Time:  result.Time,
		}

		fmt.Println("Received:", scoreboard)

		// Responding with a new Scoreboard object
		// err = conn.WriteJSON(scoreboard)
		// if err != nil {
		// 	log.Println("Error writing JSON:", err)
		// 	break
		// }
	}
}

// func Sender() {
// 	for {
// 		_, message, err := Ws.ReadMessage()
// 		if err != nil {
// 			log.Println(err)
// 			return
// 		}
// 		log.Println("this is the message", string(message))
// 		// if messageType == websocket.TextMessage {

// 		// Ws.WriteJSON(Scoreboard{
// 		// 	Rank:  "1",
// 		// 	Score: "360",
// 		// 	Name:  "Test",
// 		// 	Time:  "3:00",
// 		// })

// 		// }
// 	}
// }

func main() {
	js := "../js"
	css := "../css"
	img := "../img"
	audio := "../audio"

	js_ser := http.FileServer(http.Dir(js))
	css_ser := http.FileServer(http.Dir(css))
	img_ser := http.FileServer(http.Dir(img))
	audio_ser := http.FileServer(http.Dir(audio))

	http.Handle("/js/", http.StripPrefix("/js/", js_ser))
	http.Handle("/css/", http.StripPrefix("/css/", css_ser))
	http.Handle("/img/", http.StripPrefix("/img/", img_ser))
	http.Handle("/audio/", http.StripPrefix("/audio/", audio_ser))

	http.HandleFunc("/", Homepage)
	// http.HandleFunc("/scores", ScoreHandler)
	// http.HandleFunc("/post", PostScoreBoard)
	http.HandleFunc("/get", WSendpoint)

	fmt.Println("http://localhost:8080")
	http.ListenAndServe(":8080", nil)

}

// home handler
func Homepage(w http.ResponseWriter, r *http.Request) {
	var result Scoreboard
	username := r.FormValue("username")
	result.Name = username

	fmt.Println("username", username)
	Render(w)
}

// score handler
// func ScoreHandler(w http.ResponseWriter, r *http.Request) {
// 	tmpl, err := template.ParseFiles("../../Score.html")
// 	if err != nil {
// 		http.Error(w, "Error 404", http.StatusNotFound)
// 	}
// 	tmpl.Execute(w, nil)

// }

// to render the html pages
func Render(w http.ResponseWriter) {
	tmpl, err := template.ParseFiles("../../index.html", "../../player.html")
	if err != nil {
		http.Error(w, "Error 404", http.StatusNotFound)
	}
	tmpl.ExecuteTemplate(w, "index.html", nil)
}
