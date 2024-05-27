import {
  backAudio,
  bonusAudio,
  coinAudio,
  dieAudio,
  gameOverModal,
  img,
  imgStorage,
  killAudio,
  powerDuration,
  vw,
  winModal,
} from "./constants.js";
import {
  // levels
  levelsData,
  // loadLevelsData
} from "./levels.js"
import {
  game
} from "./game.js";
import {
  showHistory
} from "./history.js";
import { removeKeyListener } from "./eventListeners.js";
export {
  gameData,
  Timer,
  gameOver,
  randomInterval,
  checkCollision,
  updateLives,
  updateScore,
  addScore,
  hideModals,
  switchLevel,
  checkEnd,
  decreaseLife,
  camera,
  restartGame,
  pauseGame,
  animate,
  showStats,
  setPlayerSkin,
  killGame,
  charInViewport
};

var gameData = {
  countdownTime: 240,
  duration: 240,
  currentLevel: 0,
  globalAnimation: 0,
  isJumping: false,
  player: null,
  totalScore: 0,
  lives: 3,
  coins: 0,
  levelScore: 0,
  distance: 0,
  obstacles: [],
  characters: [],
  isGameOver: false,
  levelEndPause: false,
  isAttacking: false,
  viewport: {
    left: 0,
    top: 0
  }
}

// Start animation
function Timer(t) {
  var countdownElement = document.getElementById("timer");

  gameData.countdownTime = gameData.duration;

  gameData.timeLoop = setInterval(function () {
    if (!(gameData.paused || gameData.levelEndPause) && gameData.countdownTime >= 0) {
      gameData.countdownTime--;
    }
    countdownElement.textContent = " 🕐 " + gameData.countdownTime;

    if (gameData.countdownTime <= 0) {
      killGame()
      gameOver();
    }
  }, t);
}

function gameOver() {
  removeKeyListener()
  showStats();
  killGame()
  gameOverModal.style.display = "flex";
  document.querySelector("#game-over-text").textContent = "GameOver"
  gameOverModal.classList.remove("hidden");
  gameData.isGameOver = true;
}

let randomInterval = (min, max) => Math.floor(Math.random() * (max - min) + min);

function checkCollision(player, obstacle, contact = 0) {
  // Calculer les coordonnées des bords du joueur et de l'obstacle
  const playerLeft = player.distance;
  const playerRight = playerLeft + player.width;
  const playerBottom = player.altitude;
  const playerTop = playerBottom + player.height;

  const obstacleLeft = obstacle.type === "enemy" ? obstacle.distance : obstacle.position.x;
  const obstacleRight = obstacleLeft + obstacle.width;
  const obstacleBottom = obstacle.type === "enemy" ? obstacle.altitude : obstacle.position.y;
  const obstacleTop = obstacleBottom + obstacle.height;

  // Vérifier s'il y a collision
  if (
    playerLeft + contact < obstacleRight &&
    obstacleLeft + contact < playerRight &&
    obstacleBottom + contact < playerTop &&
    playerBottom + contact < obstacleTop
  ) {
    return true;
  }

  return false;
}

let updateScore = () => (document.querySelector("#score").textContent = `Score: ${gameData.totalScore}`);
let updateLives = () => (document.querySelector("#life").textContent = " ❤️ ".repeat(gameData.lives));

function addScore(n) {
  gameData.totalScore += n;
  gameData.levelScore += n;
  updateScore();
}

function hideModals() {
  const modals = document.querySelectorAll("#pauseModal, #gameOverModal, #winModal ,#getInModal, #instructionsModal");
  modals.forEach(modal => {
    modal.classList.add("hidden")
  });
}

function switchLevel() {
  gameData.currentLevel++;
  showStats();
  if (gameData.currentLevel < levelsData.length) {
    const level = levelsData[gameData.currentLevel];
    // Notifications de fin de niveau

    winModal.style.display = "flex";
    winModal.classList.remove("hidden");
    gameData.levelEndPause = true;
    document.querySelector("#btn_continue_win").addEventListener("click", () => {
      gameData.levelEndPause = false;
      game(
        level.scene,
        level.obstacles,
        level.enemies,
        level.background,
        level.duration,
        level.end,
        score
      );
    });
  } else {
    // alert("You finished the GAME !");
    gameOverModal.style.display = "flex"
    gameOverModal.classList.remove("hidden")
    document.querySelector("#game-over-text").textContent = "You Finished the Game"
    gameData.levelEndPause = true
  }
}

function checkEnd() {
  if (gameData.player.distance >= levelsData[gameData.currentLevel].end) {
    switchLevel();
  }
}

function killGame() {
  cancelAnimationFrame(gameData.globalAnimation)
  clearInterval(gameData.timeLoop);
}

function decreaseLife() {
  gameData.lives--;
  killGame()
  if (gameData.lives >= 1) {
    gameData.totalScore -= gameData.levelScore;
    game(
      levelsData[gameData.currentLevel].scene,
      levelsData[gameData.currentLevel].obstacles,
      levelsData[gameData.currentLevel].enemies,
      levelsData[gameData.currentLevel].background,
      levelsData[gameData.currentLevel].duration,
      levelsData[gameData.currentLevel].end
    );
  } else {
    gameData.paused = true;
    gameData.isGameOver = true;
    gameOver();
  }
}

function camera() {
  if (gameData.player.distance - gameData.viewport.left >= vw() / 2) {
    world.scrollLeft += 5;
    gameData.viewport.left += 5;
  }

  if (gameData.player.altitude + gameData.player.height < 0) {
    decreaseLife();
  }
}

// handle pause option
function pauseGame() {
  gameData.paused = !gameData.paused
}

// handle the restart option
function restartGame() {
  // window.location.reload()
  [gameData.currentLevel, gameData.lives, gameData.totalScore, gameData.levelScore, gameData.paused, gameData.levelEndPause, gameData.player, gameData.isGameOver] = [0, 3, 0, 0, false, false, null, false]
  hideModals();
  game(
    levelsData[gameData.currentLevel].scene,
    levelsData[gameData.currentLevel].obstacles,
    levelsData[gameData.currentLevel].enemies,
    levelsData[gameData.currentLevel].background,
    levelsData[gameData.currentLevel].duration,
    levelsData[gameData.currentLevel].end
  );
}

function animate(end) {
  backAudio.play();
  const PauseMenu = document.querySelector("#pauseModal");

  setTimeout(() => {
    cancelAnimationFrame(gameData.globalAnimation)
    gameData.globalAnimation = requestAnimationFrame(animate);
  }, 0)

  updatePlayerScore();

  if (shouldContinueAnimating()) {
    PauseMenu.classList.add("hidden")

    // Mise à jour des personnages et détection de la colision
    charactersLoop(end)

    // Mise à jour des obstacles
    // updateObstacles()

    // Vérification de l'atteinte de la fin du niveau
    checkEnd();

    setTimeout(() => {
      camera()
    }, 0)
  } else if (shouldDisplayPauseMenu()) {
    PauseMenu.classList.remove("hidden");
    PauseMenu.style.display = "flex";
  }
}


/////////////////////////////////////
function updatePlayerScore() {
  let posX = gameData.player.distance;
  if (
    posX !== 0 &&
    posX > gameData.distance &&
    posX - gameData.distance >= 1000
  ) {
    addScore(10);
    gameData.distance = gameData.player.distance;
  }
}

// ////////////////
function shouldContinueAnimating() {
  return (
    !gameData.paused &&
    !gameData.isGameOver &&
    !gameData.levelEndPause &&
    !gameData.showHistoryPause
  );
}
// //////////////////////////////
function handleCollision(char) {
  let newObstacleType;
  let obstacleFound;
  let obstacleIndex;
  var found = false;
  var onground = false;


  gameData.obstacles.forEach((obstacle, i) => {
    if (!obstacle.drawed) obstacle.draw()

    if (
      obstacle.type !== "life" &&
      obstacle.type !== "power" &&
      obstacle.type !== "coin"
    ) {
      if (checkCollision(char, obstacle)) {
        if (char.type === "enemy") {
          char.velocity.x = char.direction;
          if (found) {
            char.turn();
          }
        }
        // Empêcher le joueur de passer à travers l'obstacle par le haut, le bas, la gauche ou la droite
        const playerLeft = char.distance;
        const playerRight = playerLeft + char.width;
        const playerBottom = char.altitude;
        const playerTop = playerBottom + char.height;
        const obstacleBottom = obstacle.position.y;
        const obstacleTop = obstacleBottom + obstacle.height;
        const obstacleLeft = obstacle.position.x;
        const obstacleRight = obstacleLeft + obstacle.width;

        // Le joueur et l'obstacle sont sur le même alignement Vertical
        const obstacleAndPlayerSameVAxis =
          (obstacleLeft <= playerLeft && playerLeft <= obstacleRight) || // Le joueur dépasse l'obstacle sur la droite
          (obstacleLeft <= playerRight && playerRight <= obstacleRight) || // Le joueur dépasse l'obstacle sur la gauche
          (playerLeft <= obstacleLeft && obstacleRight <= playerRight); // L'obstacle est entre la gauche et la droite du joueur

        const obstacleAndPlayerSameHAxis =
          (obstacleBottom <= playerBottom && playerBottom <= obstacleTop) || // La tête du joueur dépasse l'obstacle
          (obstacleBottom <= playerTop && playerTop <= obstacleTop) || // L'obstacle dépasse la tête du joueur
          (playerBottom <= obstacleBottom && obstacleTop <= playerTop); // L'obstacle est entre la tête et les pieds du joueur

        // Est en dessous de l'obstacle
        const playerUnderObstacle =
          obstacleAndPlayerSameVAxis &&
          (playerBottom < obstacleBottom && obstacleBottom < playerTop);

        // Est au dessus de l'obstacle
        const playerOverObstacle =
          obstacleAndPlayerSameVAxis &&
          (playerBottom < obstacleTop && obstacleTop < playerTop);

        // Est avant l'obstacle
        const playerBeforeObstacle =
          obstacleAndPlayerSameHAxis &&
          (playerLeft < obstacleLeft && obstacleLeft < playerRight);

        // Est après l'obstacle
        const playerAfterObstacle =
          obstacleAndPlayerSameHAxis &&
          (playerLeft < obstacleRight && obstacleRight < playerRight);

        if (playerUnderObstacle) {
          char.altitude = obstacleBottom - char.height;
          char.velocity.y = 0;
        } else if (playerOverObstacle) {
          char.altitude =
            obstacleTop - (obstacle.type === "ground" ? 20 : 8);
          char.velocity.y = 0;
          onground = true;
        } else if (playerBeforeObstacle) {
          char.distance = obstacleLeft - char.width;
          char.velocity.x = 0;
        } else if (playerAfterObstacle) {
          char.distance = obstacleRight;
          char.velocity.x = 0;
        }
        found = true;
      }
    } else {
      if (checkCollision(gameData.player, obstacle, obstacle.width / 2) && !obstacle.taken) {
        newObstacleType = obstacle.type;
        obstacleFound = obstacle;
        obstacleIndex = i;
      }
    }
  });

  if (newObstacleType !== gameData.lastObstacleType) {
    gameData.lastObstacleType = newObstacleType;
    if (gameData.lastObstacleType === "coin") {
      // console.log("Got coin !");
      obstacleFound.element.remove();
      obstacleFound.taken = true;
      coinAudio.play();
      gameData.obstacles.splice(obstacleIndex, 1);
      addScore(20);
      gameData.coins++;
    } else if (gameData.lastObstacleType === "life") {
      // console.log("Got life !");
      obstacleFound.element.remove();
      bonusAudio.play();
      gameData.obstacles.splice(obstacleIndex, 1);
      gameData.lives++;
      updateLives();
    } else if (
      gameData.lastObstacleType === "power" &&
      !gameData.player.power
    ) {
      // console.log("Got power !");
      obstacleFound.element.remove();
      bonusAudio.play();
      gameData.obstacles.splice(obstacleIndex, 1);
      gameData.player.power = true;
    }
  }

  char.onground = onground
}

// ////////////////////////////
function handlePlayerMovement(char) {
  if (char.type === "player") {
    if (gameData.keys.right.pressed) {
      char.velocity.x = 5;
      char.element.skin.style.transform = `scaleX(1)`;
    } else if (
      gameData.keys.left.pressed &&
      char.distance - gameData.viewport.left > 2
    ) {
      char.velocity.x = -5;
      char.element.skin.style.transform = `scaleX(-1)`;
    } else {
      char.velocity.x = 0;
    }
  }
}

// ///////////////////////
function handlePlayerAnimation(char) {
  if (char.type === "player") {
    if (char.velocity.x === 0) {
      if (gameData.isAttacking) {
        char.element.skin.className = "attack"
      } else {
        char.element.skin.className = "idle";
      }
    } else {
      if (gameData.isAttacking) {
        char.element.skin.className = "attack"
      } else {
        char.element.skin.className = "run";
      }
    }
  }
}
// ///////////////////////////::*
function handlePlayerPosition(char, end) {
  if (char.type === "player") {
    if (gameData.player.onground === false) {
      char.element.skin.className = "jump";
    }
    if (char.x === end) {
      return true;
    }
    showHistory(char.distance);
  }
}
// ////////////////////////
function updateCharacters(end, char, i) {
  let updatableChar = char.type === "player" || (char.type === "enemy" && charInViewport(char))
  // let updatableChar = char.mobile
  if (updatableChar) char.update();

  // Vérifier les collisions avec les obstacles
  handleCollision(char)
  handlePlayerMovement(char)
  handlePlayerAnimation(char)
  handlePlayerPosition(char, end)
}
// ///////////////////////////////
function shouldDisplayPauseMenu() {
  return gameData.paused && !gameData.isGameOver && !gameData.levelEndPause;
}

// ///////////////////////////////
// function updateObstacles() {
// }

function charactersLoop(end) {
  gameData.characters.forEach((char, i) => {
    updateCharacters(end, char, i);
    handlePlayerEnemyCollision(char, i)
  });
}

// ////////////////////////////////////
function handlePlayerEnemyCollision(char, i) {
  if (char.type === "enemy") {
    if (checkCollision(gameData.player, char, 2)) {
      if (!gameData.player.power) {
        // console.log("Dead !");
        dieAudio.play();
        decreaseLife()
      } else if (gameData.player.power) {
        // console.log("Enemy killed !");
        gameData.player.velocity.x = 0
        char.velocity.x = 0
        setTimeout(() => {
          char.element.box.classList.add("hidden");
        }, 800)
        if (!gameData.isAttacking) {
          gameData.isAttacking = true
          setTimeout(() => {
            gameData.player.element.skin.className = "idle"
            gameData.isAttacking = false
          }, 500)
        }
        gameData.player.element.skin.className = "attack"
        killAudio.play();
        addScore(10);
        gameData.characters.splice(i, 1);
        // On doit supprimer l'élément de la liste des gameData.characters

        // Sleep for 5 seconds
        setTimeout(function () {
          gameData.player.power = false;
        }, powerDuration); // 5000 milliseconds = 5 seconds
      }
    }
  }
}

function showStats() {
  // handle the print of tab sta
  document
    .querySelectorAll("#timeStats_pause, #timeStats_GO, #timeStats_win")
    .forEach(el => {
      el.style.color = "white";
    });

  document
    .querySelectorAll("#livesStats_pause, #livesStats_GO, #livesStats_win")
    .forEach(el => {
      if (gameData.lives >= 0) {
        el.textContent = " ❤️ ".repeat(gameData.lives);
      } else {
        el.textContent = "";
      }
      el.style.color = "white";
      el.style.fontSize = "30px";
    });

  document
    .querySelectorAll("#scoreStats_pause, #scoreStats_GO, #scoreStats_win")
    .forEach(el => {
      el.textContent = `🎯 ${gameData.totalScore}`;
      el.style.color = "white";
      el.style.fontSize = "30px";
    });

  document
    .querySelectorAll("#timeStats_pause, #timeStats_GO, #timeStats_win")
    .forEach(el => {
      el.textContent = ` 🕐 ${gameData.countdownTime >= 0 ? gameData.countdownTime : 0}`;
      el.style.fontSize = "30px";
    });
}


function setPlayerSkin() {
  document.querySelector("#player_name").innerHTML = playersInfos[selectedPlayer].name
  document.querySelector("#homePlayer").style.backgroundImage = `url('/img/player-${playersInfos[selectedPlayer].number}-home.png')`
  img.player = `${imgStorage}player-${playersInfos[selectedPlayer].number}.png`
}

// function elementInViewport(el) {
//   var rect = el.getBoundingClientRect();

//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height && /* or $(window).height() */
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width /* or $(window).width() */
//   );
// }

function charInViewport(char) {
  return gameData.viewport.left < char.distance + char.width && char.distance < gameData.viewport.left + vw()
}