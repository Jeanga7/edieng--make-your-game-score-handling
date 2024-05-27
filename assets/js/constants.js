import { gameData, setPlayerSkin } from "./utils.js";

export {
    img,
    imgStorage,
    audioStorage,
    gravity,
    world,
    enemyContact,
    playerInitialPosition,
    playerDims,
    numberOfEnemies,
    powerDuration,
    backAudio,
    runAudio,
    coinAudio,
    bonusAudio,
    killAudio,
    dieAudio,
    vw,
    vh,
    winModal,
    gameOverModal,
    audio,
    music,
    audios
}

const imgStorage = "/img/"
const audioStorage = "/audio"
const gravity = -1.5;
const world = document.querySelector('#world');
const enemyContact = 25
const playerInitialPosition = {
    x: 50,
    y: 100
}
const playerDims = {
    w: 60,
    h: 60
}
const powerDuration = 5000

const img = Object.fromEntries(Object.entries({
    sky: "sky.jpg",
    ground: "desert-ground.png",
    player: `player-${playersInfos[selectedPlayer].number}.png`,
    playerJumping: "jumping.png",
    playerFalling: "falling.png",
    enemy: "static.png",
    runningPlayer: "running-player.gif",
    platform1: "",
    platform2: "platforme2.png",
    colonne: "bloc4-obstacle.png",
    scene1: "pyramid-sphinx.png",
    sun: "sun.png",
    moon: "moon.png",
    scene2: "desert1.png",
    enemy_1: "enemy1.gif",
    enemy_2: "enemy2.gif",
    enemy_3: "enemy3.gif",
    enemy_4: "enemy4.gif",
    enemy_5: "enemy5.gif",
    enemy_6: "enemy6.gif",
    enemy_7: "enemy7.gif",
    status: "status_colonne.png",
    sphinx: "sphinx.png",
    gameOver: "anibus_gameOver.jpeg",
    groundNL: "groundNextLevel.jpeg",
    life: "coeur.gif",
    power: "power.gif",
    coin: "coin.gif",
    panneau: "panneau-histoire.png",
    chameau: "chameau.png",
    greceBuilding: "grece-building.png",
    romeArena: "romeArena.png",
    roiGrec: "roi-grec.png",
    nuage: "nuage.png",
    nuage2: "nuage2.png",
    platformNeige: "platformNeige.png",
    bouleNeige: "bouleNeige.png",
    chateauNeige: "chateauNeige.png",
    montagneNeige: "montagneNeige.png",
    maisonNeige: "maisonNeige.png",
    groundNeige: "ground-neige.jpeg",
}).map(el => [el[0], imgStorage + el[1]]))

setPlayerSkin()

const numberOfEnemies = Object.entries(img)
    .filter(el => el[0].includes("enemy_"))
    .length

const backAudio = new Audio("/audio/ancian-egyptian-theme.mp3")
const runAudio = new Audio("/audio/run-on-sand.mp3")
const coinAudio = new Audio("/audio/rang.mp3")
const bonusAudio = new Audio("/audio/bonus.mp3")
const dieAudio = new Audio("/audio/dying.mp3")
const killAudio = new Audio("/audio/kill.mp3")

gameData.currentIndex = 0;
const audios = [
    audioStorage + "/paragraphe1_histoire.mp3",
    audioStorage + "/paragraphe2_histoire.mp3",
    audioStorage + "/paragraphe3_histoire.mp3",
    audioStorage + "/paragraphe4_histoire.mp3"
];

let audio = new Audio(audios[gameData.currentIndex]);
let music = new Audio(audioStorage + "/music_history.mp3")

const vw = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const gameOverModal = document.querySelector("#gameOverModal")
const winModal = document.querySelector("#winModal");