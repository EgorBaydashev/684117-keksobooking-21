'use strict';

(function () {
  const mapPinMain = document.querySelector('.map__pin--main');
  const adForm = document.querySelector('.ad-form');
  const fieldAddress = adForm.querySelector('#address');
  const fieldRoomNumber = adForm.querySelector('#room_number');
  const fieldCapacity = adForm.querySelector('#capacity');
  const fieldType = adForm.querySelector('#type');
  const fieldPrice = adForm.querySelector('#price');
  const fieldTimeIn = adForm.querySelector('#timein');
  const fieldTimeOut = adForm.querySelector('#timeout');

  const setAddress = function (isDefault) {
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

  const validateRooms = function () {
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

  const validateMinPrice = function () {
    let fieldTypeValue = fieldType.value;

    fieldPrice.placeholder = window.card.typesOffers[fieldTypeValue].minPrice;
    fieldPrice.min = window.card.typesOffers[fieldTypeValue].minPrice;
  };

  const fieldTypeChangeHandler = function () {
    validateMinPrice();
  };

  const fieldRoomNumberChangeHandler = function () {
    validateRooms();
  };

  const fieldTimeInChangeHandler = function () {
    fieldTimeIn.value = fieldTimeOut.value;
  };

  const fieldTimeOutChangeHandler = function () {
    fieldTimeOut.value = fieldTimeIn.value;
  };

  window.form = {
    mapPinMain,
    adForm,
    fieldTimeIn,
    fieldTimeOut,
    setAddress,
    validateRooms,
    validateMinPrice,
    fieldTypeChangeHandler,
    fieldRoomNumberChangeHandler,
    fieldTimeInChangeHandler,
    fieldTimeOutChangeHandler
  };
})();
