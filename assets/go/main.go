package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
)

type Scoreboard struct {
	Rank  string `json:"rank"`
	Name  string `json:"name"`
	Score string `json:"score"`
	Time  string `json:"time"`
}

// / get the score of the players not the actual player
func GetScoreBoard(w http.ResponseWriter, r *http.Request) {

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
func PostScoreBoard(w http.ResponseWriter, r *http.Request) {

}

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
	http.HandleFunc("/scores", ScoreHandler)
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
func ScoreHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("../../Score.html")
	if err != nil {
		http.Error(w, "Error 404", http.StatusNotFound)
	}
	tmpl.Execute(w, nil)

}

// to render the html pages
func Render(w http.ResponseWriter) {
	tmpl, err := template.ParseFiles("../../index.html", "../../player.html")
	if err != nil {
		http.Error(w, "Error 404", http.StatusNotFound)
	}
	tmpl.ExecuteTemplate(w, "index.html", nil)
}
