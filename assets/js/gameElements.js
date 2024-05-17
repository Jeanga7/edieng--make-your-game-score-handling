export {
    createWorldElements
};

const world = document.getElementById("world");

function createWorldElements(bg, duration, gameData, img) {
    // world.innerHTML = "";
    world.scrollLeft = 0;
    world.innerHTML =`
    <div id="scene" style="background:${bg};"></div>
    <div id="gameInfosZone">
        <div id="gameInfos">
            <div id="score" style="color: white;" >Score: ${gameData.totalScore}</div>
            <div id="life" >${" ❤️ ".repeat(gameData.lives)}</div>
            <div id="timer" style="color:white">🕐 ${duration}</div>
        </div>
        <div id="pauseBtn"></div>
    </div>
    `
}
