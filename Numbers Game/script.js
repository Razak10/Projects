// Number Game

// Selected Elements
const player0El = document.querySelector(".player--0");
const score0El = document.querySelector("#score--0");
const current0El = document.getElementById("current--0");
const player1El = document.querySelector(".player--1");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; // THese are the 2 big scores under player name
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

// This will switch the active player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

//  This will Generate a Random Dice Roll when you click on the ROll DICE Button, display it and then see if it > 1, if not then switch players and repeat.
btnRoll.addEventListener("click", function () {
  if (playing === true) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Check to see if the roll is 1, if is is we add it to the current score, if it isnt then we switch players
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// THis will use the HOLD BUTTON and store the the current score into your total score
btnHold.addEventListener("click", function () {
  if (playing === true) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // then check to see if score is 100 or more, if so then game is over,
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// This Resets the game
btnNew.addEventListener("click", init);
