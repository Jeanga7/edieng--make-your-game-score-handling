import {
    audioStorage,
    img,
    runAudio
} from "./constants.js"
import {
    game
} from "./game.mjs"
import {
    levels
} from "./levels.js"
import {
    gameData,
    hideModals,
    pauseGame,
    restartGame,
    setPlayerSkin
} from "./utils.js"

export {
    addPauseContinue
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (key === "P" || key === "ESCAPE") {
        pauseGame();
    } else if (key === "R") {
        restartGame();
    }

    switch (event.key) {
        case "ArrowLeft":
            runAudio.play()
            gameData.keys.left.pressed = true;
            break;

        case "ArrowRight":
            runAudio.play()
            gameData.keys.right.pressed = true;
            break;

        case " ":
        case "ArrowUp":
            if (!gameData.isJumping && gameData.player.onground) {
                gameData.isJumping = true;
                gameData.player.velocity.y += 20;
                gameData.player.onground = false
            }
            break;
    }
});

function addPauseContinue() {
    document.querySelector("#continu").addEventListener('click', pauseGame);
    document.querySelector("#pauseBtn").addEventListener("click", pauseGame)
}

function handleRestart() {
    document.querySelectorAll("#pauseModal, #gameOverModal, #winModal").forEach(modal => {
        modal.classList.add("hidden");
    });
    restartGame();
}

// pour les boutons de restart
document.querySelectorAll("#restart, #btn_restart_GO, #btn_restart_win").forEach(btn => {
    btn.addEventListener('click', handleRestart);
});

// handle main menu
function showMainMenuModal() {
    document.querySelector('#mainMenuModal').style.display = "flex";
    document.querySelector('#mainMenuModal').classList.remove("hidden");
    document.querySelector("#getInModal").classList.add("hidden");
}

let isPageRefreshed = false;
document.querySelectorAll("#main-menu, #btn_mainmenu_GO").forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isPageRefreshed) {
            window.location.reload();
            isPageRefreshed = true;
        }
        showMainMenuModal();
    });
});

gameData.isJumping = false;

document.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft") {
        runAudio.pause()
        gameData.keys.left.pressed = false;
        gameData.player.velocity.x = 0;
        gameData.player.element.style.backgroundImage = `url('${img.player}')`;
    }
    if (event.key === "ArrowRight") {
        runAudio.pause()
        gameData.keys.right.pressed = false;
        gameData.player.velocity.x = 0;
        gameData.player.element.style.backgroundImage = `url('${img.player}')`;
    }

    if (event.key === "ArrowUp" || event.key === " ") {
        gameData.isJumping = false;
        // gameData.player.onground = true
    }
});

document.querySelector("#play").addEventListener('click', () => {
    audio.pause();
    music.pause();
    audio.currentTime = 0;
    currentIndex = 0;

    document.querySelector('#mainMenuModal').classList.add("hidden");
    [gameData.paused, gameData.levelEndPause, gameData.timeLoop, gameData.totalScore, gameData.lives, gameData.coins, gameData.levelScore, gameData.distance] = [false, false, null, 0, 3, 0, 0, 0];
    hideModals()
    if (levels.length === 0) {
        alert("Add levels to the game.")
        window.location.reload()
    } else {
        game(levels[0].scene, levels[0].obstacles, levels[0].enemies, levels[0].background, levels[0].duration, levels[0].end);
    }
})

document.querySelectorAll("#btn_classement_GO, #btn_classement_win").forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector("#getInModal").style.display = "flex";
        document.querySelector("#getInModal").classList.remove("hidden");
    });
});

let currentIndex = 0;
const audios = [
    audioStorage + "/paragraphe1_histoire.mp3",
    audioStorage + "/paragraphe2_histoire.mp3",
    audioStorage + "/paragraphe3_histoire.mp3",
    audioStorage + "/paragraphe4_histoire.mp3"
];
let audio = new Audio(audios[currentIndex]);
let music = new Audio(audioStorage + "/music_history.mp3")

audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % audios.length;
    if (currentIndex === 0) {
        audio.pause();
        music.pause();
    } else {
        music.volume = 0.2;
        audio.src = audios[currentIndex];
        audio.play();
        music.play();
    }
});

document.querySelector('#history').addEventListener('click', () => {
    if (audio.paused) {
        music.volume = 0.2;
        audio.play();
        music.play();
    } else {
        audio.pause();
        music.pause();
        audio.currentTime = 0;
        currentIndex = 0;
    }
});

document.querySelector('#instructions').addEventListener('click', () => {
    document.querySelector('#instructionsModal').style.display = 'flex'
    document.querySelector('#instructionsModal').classList.remove("hidden")
})

document.querySelector('#fermerInstruction').addEventListener('click', () => {
    const modal = document.querySelector('#instructionsModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.add("hidden")
        modal.classList.remove('closing');
    }, 500);
});

setPlayerSkin()

document.querySelectorAll(".changePlayer").forEach(el => {
    el.addEventListener("click", (e) => {
        selectedPlayer = selectedPlayer === 0 ? 1 : 0
        setPlayerSkin()
    })
})