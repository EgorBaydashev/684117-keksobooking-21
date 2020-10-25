'use strict';

(function () {
  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomValueFromArray = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  const getArrRandomLength = function (arr) {
    let result = [];
    let j = getRandomNumber(1, arr.length);
    for (let i = 0; i < j; i++) {
      let element = arr[i];
      result.push(element);
    }
    return result;
  };

  const map = document.querySelector('.map');

  const getNoun = function (number, one, two, many) {
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

  const disableItems = function (items) {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('disabled', '');
    }
  };

  const enableItems = function (items) {
    for (let i = 0; i < items.length; i++) {
      items[i].removeAttribute('disabled', '');
    }
  };

  window.main = {
    getRandomNumber,
    getRandomValueFromArray,
    getArrRandomLength,
    map,
    disableItems,
    enableItems,
    getNoun
  };
})();
