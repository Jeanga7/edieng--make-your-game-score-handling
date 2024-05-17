const story = [
  // Introduction
  "Vous êtes un jeune étudiant passionné par les sciences, mais un jour, une erreur de manipulation lors de vos recherches provoque un phénomène étrange. Vous vous retrouvez soudainement transporté dans un monde inconnu et ancien, où les lois de la nature semblent différentes de celles que vous avez apprises.",
  // Développement 1
  "Désorienté mais déterminé, vous découvrez que ce monde est rempli de défis et de dangers. Vous devez apprendre à vous adapter rapidement pour survivre. Vous réalisez également que pour retrouver votre monde d'origine, vous devez traverser une série de mondes qui représentent différentes époques, chacun étant gardé par des êtres mystérieux.",
  // Développement 2
  "Au fil de votre périple, vous découvrez des indices sur l'origine de cet anachronisme et sur la manière de le corriger. Vous ramassez des bonus qui vous aident à vous adapter à chaque nouvel environnement et à affronter les gardiens de chaque monde. Chaque monde traversé vous rapproche un peu plus de votre époque d'origine, mais aussi de la résolution du mystère qui vous a conduit ici.",
  // Conclusion
  "Après avoir surmonté de nombreux obstacles et avoir collecté des indices précieux, vous parvenez enfin à retourner dans votre monde. Mais votre aventure ne s'arrête pas là, car vous réalisez que les connaissances que vous avez acquises et les expériences que vous avez vécues dans ces mondes anciens ont changé votre perception du temps et de l'histoire à jamais",
  // slogan
  "Découvrez les méandres du temps dans Anachronos : voyagez à travers les époques, affrontez l'inconnu, devenez le maître du temps !"
];

import { gameData } from "./utils.js";

export { showHistory };

let reachedCheckpoints = [];
let currentCharIndex = 0;

function showHistory(playerPos) {
  const checkpoints = [140, 1100, 2345, 3604, 4099];

  for (let i = 0; i < checkpoints.length; i++) {
    if (playerPos >= checkpoints[i] - 2 && playerPos <= checkpoints[i] + 2 && !reachedCheckpoints.includes(checkpoints[i]) && !gameData.showHistoryPause) {
      const paragraphIndex = i;
      const text = story[paragraphIndex];

      document.querySelector("#historyModal").style.display = "flex";
      document.querySelector("#historyModal").classList.remove("hidden");
      let textElement = document.getElementById("textHistory");
      textElement.textContent = "";

      reachedCheckpoints.push(checkpoints[i]);
      gameData.showHistoryPause = true;

      let interval = setInterval(() => {
        textElement.textContent += text[currentCharIndex];
        currentCharIndex++;

        document.querySelector('#skip').addEventListener('click', () => {
            clearInterval(interval); 
            textElement.textContent = text; 
            closeHistory();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                clearInterval(interval); 
                textElement.textContent = text;
                closeHistory();
            }
        });

        if (currentCharIndex === text.length) {
            clearInterval(interval);
            setTimeout(() => {
                closeHistory()
            }, 3000);
        }
      }, 30);

      break;
    }
  }
}

function closeHistory() {
  document.querySelector("#historyModal").classList.add("hidden")
  gameData.showHistoryPause = false;
  currentCharIndex = 0;
}

/* function showHistory(playerPos) {
  const checkpoints = [140, 1100, 2339, 3604, 4099];
  const paragraphIndex = checkpoints.indexOf(playerPos);
  const historyModal = document.querySelector("#historyModal") 

  if (paragraphIndex !== -1 && !reachedCheckpoints.includes(playerPos)) {
    historyModal.style.display = "flex";
    document.querySelector("#textHistory").textContent = story[paragraphIndex];
    reachedCheckpoints.push(playerPos);
    gameData.showHistoryPause = true;

    setTimeout(() => {
      historyModal.classList.add("hidden")
      gameData.showHistoryPause = false;
    }, 5000);
  }
} */