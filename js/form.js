'use strict';

const PIN_MAIN_X = 570;
const PIN_MAIN_Y = 375;

const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const formElements = document.querySelectorAll(`.map__filter, fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const adFormReset = adForm.querySelector(`.ad-form__reset`);
const fieldAddress = adForm.querySelector(`#address`);
const fieldRoomNumber = adForm.querySelector(`#room_number`);
const fieldCapacity = adForm.querySelector(`#capacity`);
const fieldType = adForm.querySelector(`#type`);
const fieldPrice = adForm.querySelector(`#price`);
const fieldTimeIn = adForm.querySelector(`#timein`);
const fieldTimeOut = adForm.querySelector(`#timeout`);

const setAddress = (isDefault) => {
  let xPosition;
  let yPosition;
  if (isDefault) {
    xPosition = parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2);
    yPosition = parseInt(mapPinMain.style.top, 10) + Math.round(mapPinMain.offsetHeight / 2);
  } else {
    xPosition = parseInt(mapPinMain.style.left, 10) + Math.round(window.pin.PIN_X_OFFSET / 2);
    yPosition = parseInt(mapPinMain.style.top, 10) + window.pin.PIN_Y_OFFSET;
  }
  return (fieldAddress.value = `${xPosition}, ${yPosition}`);
};

let guestsCount = [1, 2, 3];

const validateRooms = () => {
  if (fieldRoomNumber.value === `1` && fieldCapacity.value !== `1`) {
    fieldCapacity.setCustomValidity(`1 комната для 1-го гостя`);
  } else if (fieldRoomNumber.value === `2` && (fieldCapacity.value > guestsCount[1] || fieldCapacity.value === `0`)) {
    fieldCapacity.setCustomValidity(`2 комнаты для 1-го или 2-х гостей`);
  } else if (fieldRoomNumber.value === `3` && fieldCapacity.value < guestsCount[0]) {
    fieldCapacity.setCustomValidity(`3 комнаты для 1-го, 2-х или 3-х гостей`);
  } else if (fieldRoomNumber.value > guestsCount[2] && fieldCapacity.value !== `0`) {
    fieldCapacity.setCustomValidity(`100 комнат не для гостей`);
  } else {
    fieldCapacity.setCustomValidity(``);
  }
};

const validateMinPrice = () => {
  let fieldTypeValue = fieldType.value;

  fieldPrice.placeholder = window.card.typesOffers[fieldTypeValue].minPrice;
  fieldPrice.min = window.card.typesOffers[fieldTypeValue].minPrice;
};

const fieldTypeChangeHandler = () => {
  validateMinPrice();
};

const fieldRoomNumberChangeHandler = () => {
  validateRooms();
};

const fieldTimeInChangeHandler = () => {
  fieldTimeIn.value = fieldTimeOut.value;
};

const fieldTimeOutChangeHandler = () => {
  fieldTimeOut.value = fieldTimeIn.value;
};

const removePins = () => {
  let pins = window.main.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((pin) => {
    pin.remove();
  });
};

const deactivateMap = () => {
  window.main.map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  window.main.disableItems(formElements);
  setPinMainDefault();
  adForm.removeEventListener(`submit`, submitFormHandler);
  adFormReset.removeEventListener(`click`, resetPage);
};

const setPinMainDefault = () => {
  mapPinMain.style.left = `${PIN_MAIN_X}px`;
  mapPinMain.style.top = `${PIN_MAIN_Y}px`;

  setAddress(true);
};

const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  window.card.cardRemoveHandler();
  deactivateMap();
  removePins();
};

const submitFormHandler = (evt) => {
  evt.preventDefault();

  window.backend.load(window.message.submitSuccessHandler, window.message.errorHandler, new FormData(adForm));

  resetPage();
};

window.form = {
  mapPinMain,
  adForm,
  mapFilters,
  fieldTimeIn,
  fieldTimeOut,
  setAddress,
  validateRooms,
  validateMinPrice,
  fieldTypeChangeHandler,
  fieldRoomNumberChangeHandler,
  fieldTimeInChangeHandler,
  fieldTimeOutChangeHandler,
  submitFormHandler,
  formElements,
  adFormReset,
  removePins,
  deactivateMap,
  resetPage
};
