'use strict';

(function () {
  const formElements = document.querySelectorAll('.map__filter, fieldset');

  const deactivateMap = function () {
    window.main.map.classList.add('map--faded');
    window.main.disableItems(formElements);
    window.form.setAddress(true);
  };

  const activateMap = function () {
    window.main.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.adForm.addEventListener('change', window.form.fieldRoomNumberChangeHandler);
    window.form.adForm.addEventListener('change', window.form.fieldTypeChangeHandler);
    window.form.fieldTimeIn.addEventListener('change', window.form.fieldTimeOutChangeHandler);
    window.form.fieldTimeOut.addEventListener('change', window.form.fieldTimeInChangeHandler);
    window.form.mapPinMain.removeEventListener('mousedown', pinClickHandler);
    window.form.mapPinMain.removeEventListener('keydown', pinEnterPressHandler);
    window.main.enableItems(formElements);
    window.form.setAddress();
    window.pin.renderPins();
    window.form.validateRooms();
    window.form.validateMinPrice();
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

  deactivateMap();

  window.form.mapPinMain.addEventListener('mousedown', pinClickHandler);
  window.form.mapPinMain.addEventListener('keydown', pinEnterPressHandler);

  window.card.cardRemoveHandler();
})();
