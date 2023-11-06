const circle = document.querySelector(".circle");
const ex = document.querySelector(".ex");
const square = document.querySelectorAll(".square");
const button = document.querySelector(".restart-btn");
const score1 = document.querySelector(".player-score__1");
const score2 = document.querySelector(".player-score__2");
const player1Label = document.querySelector(".player-title__1");
const player2Label = document.querySelector(".player-title__2");

let activePlayer = 0;

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

let array0 = [];
let arrayX = [];
let newScore1 = Number(score1.textContent);
let newScore2 = Number(score2.textContent);

square.forEach((el, id) => {
  el.addEventListener("click", function (e) {
    player1Label.classList.toggle("active");
    player2Label.classList.toggle("active");
    if (!button.classList.contains("hidden")) return;
    if (array0.includes(id) || arrayX.includes(id)) return;
    const childElement = e.target.children;
    if (activePlayer === 0) {
      childElement[0].classList.remove("hidden");
      array0.push(id);
      activePlayer = 1;
    } else {
      childElement[1].classList.remove("hidden");
      arrayX.push(id);
      activePlayer = 0;
    }
    endgame();
  });
});

const endgame = function () {
  if (array0.length >= 3) {
    combinations.forEach((combination) => {
      const repeatAreas = array0.filter((area) => combination.includes(area));
      if (combination.length === repeatAreas.length) {
        combination.forEach((area) => {
          square[area].classList.add("winner");
        });
        button.classList.remove("hidden");
        newScore1 = newScore1 + 1;
        score1.textContent = newScore1.toString();
      }
    });
  }
  if (arrayX.length >= 3) {
    combinations.forEach((combination) => {
      const repeatAreas = arrayX.filter((area) => combination.includes(area));
      if (combination.length === repeatAreas.length) {
        combination.forEach((area) => {
          square[area].classList.add("winner");
        });
        button.classList.remove("hidden");
        newScore2 = newScore2 + 1;
        score2.textContent = newScore2.toString();
      }
    });
  }
  if (array0.concat(arrayX).length === square.length) {
    button.classList.remove("hidden");
  } else return;
};

button.addEventListener("click", () => {
  array0.forEach((area) => {
    square[area].children[0].classList.add("hidden");
    square[area].children[1].classList.add("hidden");
    square[area].classList.remove("winner");
  });

  arrayX.forEach((area) => {
    square[area].children[0].classList.add("hidden");
    square[area].children[1].classList.add("hidden");
    square[area].classList.remove("winner");
  });
  button.classList.add("hidden");
  array0 = [];
  arrayX = [];
  activePlayer = activePlayer === 1 ? 1 : 0;
});
