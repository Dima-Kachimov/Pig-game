'use strict';

// Находим все элементы на странице
const btnQuitCube = document.querySelector('.btn-quit-cube');
const btnStopCube = document.querySelector('.btn-stop-cube');
const btnNewGame = document.querySelector('.btn-new-game');

let points1 = 0;
let points2 = 0;

let glasses1 = 0;
let glasses2 = 0;

let sum1 = 0;
let sum2 = 0;

let user1 = document.querySelector('.flex-el1');
let user2 = document.querySelector('.flex-el2');

const counter1 = document.querySelectorAll('.current-points');

// Переменные
let rondomNumber;

// Изображение
let cube = document.querySelector('.cube-img');

btnQuitCube.addEventListener('click', function () {
  rondomNumber = Math.trunc(Math.random() * 6) + 1;

  // Меняем картинки
  if (rondomNumber == 1) {
    cube.src = './dice1.png';
  }
  if (rondomNumber == 2) {
    cube.src = './dice2.png';
  }
  if (rondomNumber == 3) {
    cube.src = './dice3.png';
  }
  if (rondomNumber == 4) {
    cube.src = './dice4.png';
  }
  if (rondomNumber == 5) {
    cube.src = './dice5.png';
  }
  if (rondomNumber == 6) {
    cube.src = './dice6.png';
  }

  // Смена игрока бросить кубик + текущие очки
  if (rondomNumber == 1 && user1.classList.contains('active1')) {
    points1 = 0;
    user2.classList.add('active2');
    user1.classList.remove('active1');
    document.querySelector('.current-points1').textContent = points1;
    rondomNumber = 0;
  } else if (user1.classList.contains('active1')) {
    points1 += rondomNumber;
    //  sum1 += rondomNumber;
    rondomNumber = 0;
    document.querySelector('.current-points1').textContent = points1;
  } else if (rondomNumber == 1 && user2.classList.contains('active2')) {
    user1.classList.add('active1');
    user2.classList.remove('active2');
    points1 = 0;
    document.querySelector('.current-points2').textContent = points1;
  } else if (user2.classList.contains('active2')) {
    points1 += rondomNumber;
    //  sum2 += rondomNumber;
    rondomNumber = 0;
    document.querySelector('.current-points2').textContent = points1;
  }
});
// points1 = 0;
// Общие очки

btnStopCube.addEventListener('click', function () {
  if (user1.classList.contains('active1')) {
    sum1 += points1;
    document.querySelector('.glasses1').textContent = sum1;
    points1 = 0;
    document.querySelector('.current-points1').textContent = points1;
    user1.classList.remove('active1');
    user2.classList.add('active2');
  } else {
    sum2 += points1;
    document.querySelector('.glasses2').textContent = sum2;
    points1 = 0;
    document.querySelector('.current-points2').textContent = points1;
    user2.classList.remove('active2');
    user1.classList.add('active1');
  }
  rondomNumber = 0;

  // Победа
  if (sum1 >= 20) {
    document.querySelector('.glasses1').textContent = 'ПОБЕДИТЕЛЬ!';
    btnQuitCube.classList.add('hidden');
    btnStopCube.classList.add('hidden');
    cube.classList.add('hidden');
    user2.classList.add('hidden');
    document.querySelector('.flex-el1').style.width = '100%';
    counter1.forEach(event => {
      event.classList.add('hidden');
    });
    document.querySelector('.flex-el1').style.borderRadius =
      '10px 10px 10px 10px';

    //   border-radius: 10px 10px 10px 10px;
  }
  if (sum2 >= 20) {
    document.querySelector('.glasses2').textContent = 'ПОБЕДИТЕЛЬ!';
    btnQuitCube.classList.add('hidden');
    btnStopCube.classList.add('hidden');
    cube.classList.add('hidden');
    user1.classList.add('hidden');
    document.querySelector('.flex-el2').style.width = '100%';
    counter1.forEach(event => {
      event.classList.add('hidden');
    });
    document.querySelector('.flex-el2').style.borderRadius =
      '10px 10px 10px 10px';
  }
});

// НОВАЯ ИГРА

btnNewGame.addEventListener('click', function () {
  sum1 = 0;
  sum2 = 0;
  document.querySelector('.glasses2').textContent = '0';
  document.querySelector('.glasses1').textContent = '0';
  btnQuitCube.classList.remove('hidden');
  btnStopCube.classList.remove('hidden');
  cube.classList.remove('hidden');
  user1.classList.remove('hidden');
  user2.classList.remove('hidden');
  document.querySelector('.flex-el1').style.width = '400px';
  document.querySelector('.flex-el2').style.width = '400px';
  counter1.forEach(event => {
    event.classList.remove('hidden');
  });

  user2.classList.remove('active2');
  user1.classList.add('active1');

  document.querySelector('.current-points2').textContent = 0;
  document.querySelector('.current-points1').textContent = 0;
  cube.src = './dice1.png';
});
