import { audio, music, runAudio, audios } from "./constants.js";
import {
    game
} from "./game.js"
import {
    // levels
    levelsData,
    loadLevelsData
} from "./levels.js"
import { simulateArrowUpKeyPress } from "./simulateArrowKeys.js";
import {
    gameData,
    hideModals,
    pauseGame,
    restartGame,
    setPlayerSkin,
    Time
} from "./utils.js"

import { WsConnection } from "./score.handling.js"

export {
    removeKeyListener,
    addPauseContinue
}
// ------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------
function handleRestart() {
    document.querySelectorAll("#pauseModal, #gameOverModal, #winModal").forEach(modal => {
        modal.classList.add("hidden");
    });
    restartGame();
}

function isMobileDevice() {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    return isMobile || isSmallScreen;
}

// Responsivité
function handleResize() {
    const controls = document.getElementById('controls');
    if (isMobileDevice()) {
        controls.style.display = 'flex';
    } else {
        controls.style.display = 'none';
    }
}

// Initial check
handleResize();

// handle main menu
// function showMainMenuModal() {
//     document.querySelector('#mainMenuModal').style.display = "flex";
//     document.querySelector('#mainMenuModal').classList.remove("hidden");
//     document.querySelector("#getInModal").classList.add("hidden");
// }

function addPauseContinue() {
    document.querySelector("#continu").addEventListener('click', pauseGame);
    document.querySelector("#pauseBtn").addEventListener("click", pauseGame)
}

// ------------------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------------------
// gameData.isJumping = false;
let isPageRefreshed = false


// ------------------------------------------------------------------------------
// EVENTLISTENERS
// ------------------------------------------------------------------------------

function handleKeyDown(event) {
    switch (event.key.toUpperCase()) {
        case "P":
        case "ESCAPE":
            pauseGame();
            break;

        case "R":
            restartGame();
            break;

        case "ArrowLeft".toUpperCase():
            runAudio.play();
            gameData.keys.left.pressed = true;
            break;

        case "ArrowRight".toUpperCase():
            runAudio.play();
            gameData.keys.right.pressed = true;
            break;

        case " ":
        case "ArrowUp".toUpperCase():
            if (!gameData.isJumping && gameData.player.onground) {
                gameData.isJumping = true;
                gameData.player.velocity.y += 20;
                gameData.player.onground = false;
            }
            break;
    }
}

// Ajout de l'écouteur d'événements pour gérer les touches du clavier
const eventListenerkeydown = document.addEventListener('keydown', handleKeyDown);

function removeKeyListener() {
    document.removeEventListener('keydown', handleKeyDown);
}

document.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft") {
        runAudio.pause()
        gameData.keys.left.pressed = false;
        gameData.player.velocity.x = 0;
    }
    if (event.key === "ArrowRight") {
        runAudio.pause()
        gameData.keys.right.pressed = false;
        gameData.player.velocity.x = 0;
    }

    if (event.key === "ArrowUp" || event.key === " ") {
        gameData.isJumping = false;
        // gameData.player.onground = true
    }
});

// audio.addEventListener('ended', () => {
//     gameData.currentIndex = (gameData.currentIndex + 1) % audios.length;
//     if (gameData.currentIndex === 0) {
//         audio.pause();
//         music.pause();
//     } else {
//         music.volume = 0.2;
//         audio.src = audios[gameData.currentIndex];
//         audio.play();
//         music.play();
//     }
// });

let match = (event, selector) => event.target.matches(selector)

document.body.addEventListener("click", async (event) => {
    // Vérification pour les boutons de redémarrage
    if (match(event, '#restart, #btn_restart_GO, #btn_restart_win')) {
        handleRestart();
    } else if (match(event, "#main-menu, #btn_mainmenu_GO")) {
        if (!isPageRefreshed) {
            window.location.reload();
            isPageRefreshed = true;
        }
        // showMainMenuModal();
    } else if (match(event, "#play")) {
        document.querySelector("#preloader-screen").classList.remove("hidden");
        hidePreloader(1500)

        audio.pause();
        music.pause();
        audio.currentTime = 0;
        gameData.currentIndex = 0;

        document.querySelector('#mainMenuModal').classList.add("hidden");
        [gameData.paused, gameData.levelEndPause, gameData.timeLoop, gameData.totalScore, gameData.lives, gameData.coins, gameData.levelScore, gameData.distance] = [false, false, null, 0, 3, 0, 0, 0];
        hideModals()

        await loadLevelsData();

        if (levelsData && levelsData && levelsData.length > 0) {
            Time()
            game(levelsData[0].scene, levelsData[0].obstacles, levelsData[0].enemies, levelsData[0].background, levelsData[0].duration, levelsData[0].end);
        } else {
            alert("Add levels to the game.")
            window.location.reload()
        }
    } else if (match(event, "#btn_classement_GO, #btn_classement_win")) {
        document.querySelector("#getInModal").style.display = "flex";
        document.querySelector("#getInModal").classList.remove("hidden");
        WsConnection()
    } else if (match(event, "#history")) {
        if (audio.paused) {
            music.volume = 0.2;
            audio.play();
            music.play();
        } else {
            audio.pause();
            music.pause();
            audio.currentTime = 0;
            gameData.currentIndex = 0;
        }
    } else if (match(event, "#instructions")) {
        document.querySelector('#instructionsModal').style.display = 'flex'
        document.querySelector('#instructionsModal').classList.remove("hidden")
    } else if (match(event, "#fermerInstruction")) {
        const modal = document.querySelector('#instructionsModal');
        modal.classList.add('closing');
        setTimeout(() => {
            modal.classList.add("hidden")
            modal.classList.remove('closing');
        }, 500);
    } else if (match(event, ".changePlayer")) {
        selectedPlayer = selectedPlayer === 0 ? 1 : 0
        setPlayerSkin()
    }
});

// ------------------------------------------------------------------
// CONTROL BUTTONS
// ------------------------------------------------------------------
document.body.addEventListener("mousedown", (event) => {
    if (match(event, "#controls-up")) {
        simulateArrowUpKeyPress()
    } else if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = true;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = true;
    }
});
document.body.addEventListener("mouseup", (event) => {
    if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = false;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = false;
    }
});
document.body.addEventListener("mouseleave", (event) => {
    if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = false;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = false;
    }
});

// TOUCH SCREEN
document.body.addEventListener("touchstart", (event) => {
    if (match(event, "#controls-up")) {
        simulateArrowUpKeyPress()
    } else if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = true;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = true;
    }
});
document.body.addEventListener("touchend", (event) => {
    if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = false;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = false;
    }
});
document.body.addEventListener("touchcancel", (event) => {
    if (match(event, "#controls-left")) {
        gameData.keys.left.pressed = false;
    } else if (match(event, "#controls-right")) {
        gameData.keys.right.pressed = false;
    }
});

document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("scoreboard").style.display = "none";
    window.location.reload()
});

// Ajouter un écouteur d'événement pour détecter les changements de taille de l'écran
window.addEventListener('resize', handleResize);
