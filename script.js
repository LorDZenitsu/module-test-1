// All variables ---------------------------------------------------------------

const btnRules = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const ruleModel = document.getElementById("rules-box");
const mainContainer = document.querySelector(".main_container");
const playerScoreCard = document.getElementById("player_score");
const pcScoreCard = document.getElementById("pc_score");
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const resultWinner = document.querySelectorAll(".results__winner");
const resultText = document.getElementById("results__text");
const playButton = document.getElementById("play-again");
const againstText = document.getElementById("results__against");
const btnNExt = document.querySelector("#next_btn");
const btnPlayAgain = document.getElementById("go_back");
const celebModel = document.querySelector(".celeb__container");
var playerScore;
var pcScore;

//localstorage -------------------------------------------------------------------

var storedValue = JSON.parse(localStorage.getItem("score"));
if (!storedValue) {
  var initialObj = { playerScore: 0, pcScore: 0 };
  localStorage.setItem("score", JSON.stringify(initialObj));
  updateScore((playerScore = 0), (pcScore = 0));
} else {
  playerScore = storedValue.playerScore;
  pcScore = storedValue.pcScore;
  updateScore(playerScore, pcScore);
}

//all function ----------------------------------------------------------------

function updateScore(playerScore, pcScore) {
  pcScoreCard.innerHTML = pcScore;
  playerScoreCard.innerHTML = playerScore;
  localStorage.setItem(
    "score",
    JSON.stringify({ playerScore: playerScore, pcScore: pcScore })
  );
}

function choose(choice) {
  const pcChoice = pc_Choose();
  displayResults([choice, pcChoice]);
  displayWinner([choice, pcChoice]);
}

function pc_Choose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}
function isWinner(results) {
  return results[0].beats === results[1].name;
}
function displayWinner(results) {
  const playerWins = isWinner(results);
  const pcWins = isWinner(results.reverse());
  if (playerWins) {
    resultText.innerHTML = "you win";
    resultDivs[0].classList.toggle("winner");
    btnNExt.classList.toggle("hidden");
    updateScore(++playerScore, pcScore);
  } else if (pcWins) {
    resultText.innerHTML = "you lost";
    resultDivs[1].classList.toggle("winner");
    updateScore(playerScore, ++pcScore);
  } else {
    resultText.innerHTML = "Tie up";
    playButton.innerHTML = "replay";
    againstText.innerHTML = "";
  }
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
    }, idx * 100);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

//buttons events ---------------------------------------------------------------------

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});
btnNExt.addEventListener("click", () => {
  mainContainer.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  celebModel.classList.toggle("hidden");
  btnNExt.classList.toggle("hidden");
});

btnPlayAgain.addEventListener("click", () => {
  mainContainer.classList.toggle("hidden");
  celebModel.classList.toggle("hidden");
  gameDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerHTML = "";
  againstText.innerHTML = "";
  playButton.innerHTML = "play again";
});

playButton.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  if (!btnNExt.classList.contains("hidden")) {
    btnNExt.classList.toggle("hidden");
  }
  resultsDiv.classList.toggle("hidden");
  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerHTML = "";
  againstText.innerHTML = "";
  playButton.innerHTML = "play again";
});

btnRules.addEventListener("click", () => {
  if (ruleModel.style.display === "block") {
    ruleModel.style.display = "none";
  } else {
    ruleModel.style.display = "block";
  }
});
closeBtn.addEventListener("click", () => {
  ruleModel.style.display = "none";
});
