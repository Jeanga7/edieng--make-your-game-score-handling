import {
    Player,
    Obstacle,
    Enemy,
    SceneElement
} from "./models.js";
import {
    Timer,
    gameData,
    hideModals,
    animate,
    killGame
} from "./utils.js";
import {
    img
} from "./constants.js";
import {
    createWorldElements
} from "./gameElements.js";
import {
    addPauseContinue
} from "./eventListeners.js";

export function game(sceneElements, obstacles, enemies, bg, duration, end) {
    killGame()
    hideModals()
    gameData.isGameOver = false
    createWorldElements(bg, duration, gameData, img);
    addPauseContinue()

    gameData.duration = duration
    gameData.levelScore = 0

    let decor = []

    // Scene
    sceneElements.forEach(se => {
        decor.push(new SceneElement(se.pos, se.size, se.type, se.cssPosition))
    });

    gameData.characters = [];

    gameData.player = new Player();
    gameData.characters.push(gameData.player);

    enemies.forEach(en => {
        gameData.characters.push(new Enemy(en.pos, en.mobile, en.speedUp))
    })


    gameData.obstacles = [];

    obstacles.forEach(obs => {
        gameData.obstacles.push(new Obstacle(obs.pos, obs.type, obs.size))
    })

    gameData.keys = {
        right: { pressed: false },
        left: { pressed: false }
    };
    animate(end);
    Timer(1000)
}