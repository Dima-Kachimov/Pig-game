'use strict';

// Elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Elrment = document.querySelector('.player--0');
const player1Elrment = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const totalScorse = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

// Function
const switvhActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0Elrment.classList.toggle('player--active');
  player1Elrment.classList.toggle('player--active');
};
const initGame = () => {
  totalScorse[0] = 0;
  totalScorse[1] = 0;
  currentScore = 0;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Elrment.classList.add('player--active');
  player1Elrment.classList.remove('player--active');
  diceElement.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  activePlayer = 0;
  isPlaying = true;
};

// init Game
initGame();

// Бросить кубик
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Генерация нового числа
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    // 2. Генерация изображения
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    // 3. Если число 1 переключение на другого игрока если не равно записываем очки в текущие
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switvhActivePlayer();
    }
  }
});

// Oставить
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Добавить текущие очки активному игроку
    totalScorse[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScorse[activePlayer];

    // 2. Если у активного игрока >= 100 (ПОБЕДА) если нет переключить игрока
    if (totalScorse[activePlayer] >= 20) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent = 'Победа';
      diceElement.classList.add('hidden');
    } else {
      switvhActivePlayer();
    }
  }
});

// Новая игра
btnNew.addEventListener('click', function () {
  initGame();
});
