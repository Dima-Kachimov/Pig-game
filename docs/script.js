'use strict';

// Elements
const namePlayers0 = document.querySelector('#name--0');
const namePlayers1 = document.querySelector('#name--1');
const wachRules = document.querySelector('.btn-wach-rules');
const goToGame = document.querySelector('.btn-rules');
const rulesGame = document.querySelector('.rules');
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
        diceElement.src = `./img/dice${diceNumber}.png`;
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
        if (totalScorse[activePlayer] >= 50) {
            isPlaying = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            document.getElementById(`score--${activePlayer}`).textContent =
                'Перемога';
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

/////////////////////////////////////////////////////

goToGame.addEventListener('click', function () {
    rulesGame.classList.add('none');
});

wachRules.addEventListener('click', function () {
    rulesGame.classList.toggle('none');
    goToGame.textContent = 'зрозуміло';
});

namePlayers0.addEventListener('click', function () {
    namePlayers0.textContent =
        prompt("Введіть ім'я першого гравця") || 'Гравець 1';
});
namePlayers1.addEventListener('click', function () {
    namePlayers1.textContent =
        prompt("Введіть ім'я другого гравця") || 'Гравець 2';
});
