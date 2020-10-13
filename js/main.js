'use strict';

const ADS_QUANTITY = 8;
const TITLES = ['Уютный дом', 'Шикарные апартаменты', 'Маленькая квартирка', 'Просторная студия', 'Квартира-студия', 'Пентхаус', 'Штаб-квартира президента', 'Резиденция короля'];
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS = [1, 2, 3, 4, 5];
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = 'Лучший вариант на сегодняшний день!';
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const PIN_X_MIN = 0;
const PIN_X_MAX = 1200;
const PIN_Y_MIN = 130;
const PIN_Y_MAX = 630;
const PIN_X_OFFSET = 50;
const PIN_Y_OFFSET = 70;

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

const getData = function () {
  let randomArr = [];

  for (let i = 1; i <= ADS_QUANTITY; i++) {
    let ad = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: getRandomValueFromArray(TITLES),
        address: '',
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomValueFromArray(TYPES),
        rooms: getRandomValueFromArray(ROOMS),
        guests: getRandomValueFromArray(GUESTS),
        checkin: getRandomValueFromArray(CHECKIN),
        checkout: getRandomValueFromArray(CHECKOUT),
        features: getArrRandomLength(FEATURES),
        description: DESCRIPTION,
        photos: getArrRandomLength(PHOTOS)
      },
      location: {
        x: getRandomNumber(PIN_X_MIN, PIN_X_MAX),
        y: getRandomNumber(PIN_Y_MIN, PIN_Y_MAX)
      }
    };

    ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
    randomArr.push(ad);
  }
  return randomArr;
};

const similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

const renderPin = function (ad) {
  let pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = `left: ${ad.location.x + PIN_X_OFFSET}px; top: ${(ad.location.y + PIN_Y_OFFSET)}px`;
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

const similarPinList = document.querySelector('.map__pins');
const resultData = getData();

const renderPins = function () {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < resultData.length; i++) {
    fragment.appendChild(renderPin(resultData[i]));
  }
  similarPinList.appendChild(fragment);
};

getData();
renderPins();

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const typesOffers = {
  flat: {
    ru: 'Квартира'
  },
  bungalow: {
    ru: 'Бунгало'
  },
  house: {
    ru: 'Дом'
  },
  palace: {
    ru: 'Дворец'
  }
};

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

const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

const getCard = function (value) {
  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = value.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${value.offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesOffers[value.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = `${getNoun(value.offer.rooms, ' комната для', ' комнаты для ', ' комнат для ')}${getNoun(value.offer.guests, ' гостя ', ' гостей ', ' гостей ')}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${value.offer.checkin}, выезд до ${value.offer.checkout}`;
  cardElement.querySelectorAll('.popup__features').textContent = value.offer.features;
  cardElement.querySelector('.popup__description').textContent = value.offer.description;

  let photoElement = cardElement.querySelector('.popup__photos');
  photoElement.querySelector('img').src = value.offer.photos[0];
  cardElement.querySelector('.popup__avatar').setAttribute('src', value.author.avatar);

  return cardElement;
};

const filtersContainer = document.querySelector('.map__filters-container');
map.insertBefore(getCard(resultData[0]), filtersContainer);
