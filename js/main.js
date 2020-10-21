'use strict';

const ADS_QUANTITY = 8;
const TITLES = ['Уютный дом', 'Шикарные апартаменты', 'Маленькая квартирка', 'Просторная студия', 'Квартира-студия', 'Пентхаус', 'Штаб-квартира президента', 'Резиденция короля'];
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS = [1, 2, 3, 4, 5];
const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
const TIMES = ['12:00', '13:00', '14:00'];
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
        checkin: getRandomValueFromArray(TIMES),
        checkout: getRandomValueFromArray(TIMES),
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

const map = document.querySelector('.map');

/*
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

const getCard = function (card) {
  let cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesOffers[card.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = `${getNoun(card.offer.rooms, ' комната для', ' комнаты для ', ' комнат для ')}${getNoun(card.offer.guests, ' гостя ', ' гостей ', ' гостей ')}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  let featuresBlock = cardElement.querySelector('.popup__features');
  let features = featuresBlock.querySelectorAll('.popup__feature');

  if (features.length > 0) {
    for (let i = 0; i < features.length; i++) {
      if (card.offer.features.indexOf(features[i].classList[1].replace('popup__feature--', '')) < 0) {
        features[i].remove();
      }
    }
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  let photoElement = cardElement.querySelector('.popup__photos');
  let photo = photoElement.querySelector('img');

  if (card.offer.photos.length > 0) {
    photo.src = card.offer.photos[0];
    for (let i = 1; i < card.offer.photos.length; i++) {
      let photoClone = photo.cloneNode(true);
      photoClone.src = card.offer.photos[i];
      photoElement.appendChild(photoClone);
    }
  } else {
    photo.remove();
  }

  cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

  return cardElement;
};

const filtersContainer = document.querySelector('.map__filters-container');
map.insertBefore(getCard(resultData[0]), filtersContainer);
*/

const mapPinMain = document.querySelector('.map__pin--main');
const formElements = document.querySelectorAll('.map__filter, fieldset');
const adForm = document.querySelector('.ad-form');
const fieldAddress = adForm.querySelector('#address');
const fieldRoomNumber = adForm.querySelector('#room_number');
const fieldCapacity = adForm.querySelector('#capacity');

const setDefaultAddress = function () {
  let xPosition = parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2);
  let yPosition = parseInt(mapPinMain.style.top, 10) + Math.round(mapPinMain.offsetHeight / 2);

  fieldAddress.value = `${xPosition}, ${yPosition}`;
};

const setCustomAddress = function () {
  let xPosition = parseInt(mapPinMain.style.left, 10) + Math.round(PIN_X_OFFSET / 2);
  let yPosition = parseInt(mapPinMain.style.top, 10) + PIN_Y_OFFSET;

  fieldAddress.value = `${xPosition}, ${yPosition}`;
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

const syncCapacityRoomNumbers = function () {
  if (fieldRoomNumber.value === '1' && fieldCapacity.value !== '1') {
    fieldCapacity.setCustomValidity('1 комната для 1-го гостя');
  } else if (fieldRoomNumber.value === '2' && (fieldCapacity.value > 2 || fieldCapacity.value === '0')) {
    fieldCapacity.setCustomValidity('2 комнаты для 1-го или 2-х гостей');
  } else if (fieldRoomNumber.value === '3' && fieldCapacity.value < 1) {
    fieldCapacity.setCustomValidity('3 комнаты для 1-го, 2-х или 3-х гостей');
  } else if (fieldRoomNumber.value > 3 && fieldCapacity.value !== '0') {
    fieldCapacity.setCustomValidity('100 комнат не для гостей');
  } else {
    fieldCapacity.setCustomValidity('');
  }
};

const deactivateMap = function () {
  map.classList.add('map--faded');
  disableItems(formElements);
  setDefaultAddress();
};

const activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPinMain.removeEventListener('mousedown', pinClickHandler);
  mapPinMain.removeEventListener('keydown', pinEnterPressHandler);
  enableItems(formElements);
  setCustomAddress();
  renderPins();
  adForm.addEventListener('change', syncCapacityRoomNumbers);
};

const pinClickHandler = function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
};

const pinEnterPressHandler = function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
  }
};

mapPinMain.addEventListener('mousedown', pinClickHandler);
mapPinMain.addEventListener('keydown', pinEnterPressHandler);

deactivateMap();
