import { gameData } from "./utils.js";
export { WsConnection, displayScoreboard };

function WsConnection() {
    var ws = new WebSocket("ws://localhost:8080/get");
    let playerName = '';

    ws.onopen = () => {
        console.log("Websocket on!!!");

        document.getElementById("getIn").addEventListener("click", function (e) {
            e.preventDefault();

            playerName = document.getElementById("input_name").value;
            
            var test = encodeURIComponent(playerName)
            const jsonData = {
                rank: "0",
                score: gameData.totalScore,
                name: test,
                time: gameData.time,
            };

            const jsonString = JSON.stringify(jsonData);
            const blob = new Blob([jsonString], { type: 'application/json' });

            ws.send(blob);

            document.getElementById("getInModal").style.display = "none";
        });
    };

    ws.onmessage = (e) => {
        console.log("Received message:", e.data);

        const jsonData = JSON.parse(e.data);
        displayScoreboard(jsonData, playerName);
        document.getElementById("scoreboard").style.display = 'flex';
    };
}

function displayScoreboard(jsonData, playerName) {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(jsonData.length / itemsPerPage);
    let currentPage = 1;

    function displayPage(page) {
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = jsonData.slice(startIndex, endIndex);

        let playerData = null;

        currentPageData.forEach((data) => {
            var row = tableBody.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = data.rank;
            cell2.innerHTML = data.name;
            cell3.innerHTML = data.score;
            cell4.innerHTML = data.time;

            if (data.name === playerName && playerName != "") {
                playerData = data;
                row.classList.add('highlight');
            }
        });

        const congratsMessage = document.getElementById("congratsMessage");
        if (playerName != ""){
            if (playerData) {
                congratsMessage.innerText = `Congrats ${playerName}, you are on the ${playerData.rank} position.`;
            } else {
                congratsMessage.innerText = `Congrats ${playerName}`;
            }
        }
    }

    function updatePagination() {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.innerText = i;
            button.addEventListener("click", () => {
                currentPage = i;
                displayPage(currentPage);
            });
            pagination.appendChild(button);
        }
    }

    displayPage(currentPage);
    updatePagination();
}
