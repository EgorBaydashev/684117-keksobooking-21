'use strict';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomValueFromArray = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const map = document.querySelector(`.map`);

const getNoun = (number, one, two, many) => {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return number + many;
  }
  number %= 10;
  if (number === 1) {
    return number + one;
  }
  if (number >= 2 && number <= 4) {
    return number + two;
  }
  return number + many;
};

const disableItems = (items) => {
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute(`disabled`, ``);
  }
};

const enableItems = (items) => {
  for (let i = 0; i < items.length; i++) {
    items[i].removeAttribute(`disabled`, ``);
  }
};

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

window.main = {
  getRandomNumber,
  getRandomValueFromArray,
  map,
  disableItems,
  enableItems,
  getNoun,
  Key
};
