'use strict';

//We can select the elements by two approaches as follows
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let currentScore;
let activePlayer;
let playing;
const scores = [0, 0];
//Setting the initial score conditions to zero
/*
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden'); //Hiding the dice intially
let currentScore = 0;
let activePlayer = 0; //0 is P1 and 1 is P2
const scores = [0, 0]; //USing an array to store the scores of players and updating them upon clicking hold button.
let playing = true; //Setting the status of the game
*/

//Starting conditions
const initial = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

initial();

//Adding the rolling dice fiunctionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //   *1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //    *2.Diplay dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //    *Check if rolled one, switch to the next player and add dice to the score

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; //This will be changed later as the players will be switched
    } else {
      //Switch the player
      switchPlayer();
    }
  }
});

//Adding the hold button functionality
/*Hold button has following functionalities:
 *Add the current score to players score and switch the player
 *If the player score has crossed 100, clicking hold will declare the player as winner
 */

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initial);
