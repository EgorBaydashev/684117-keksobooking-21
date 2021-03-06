'use strict';

const filterFormChangeHandler = window.debounce.debounce((data) => {
  window.form.removePins();
  window.card.cardRemoveHandler();

  window.pin.renderPins(data);
});

const successHandler = (data) => {
  window.pin.renderPins(data);

  window.form.mapFilters.addEventListener(`change`, () => {
    filterFormChangeHandler(data);
  });
};

const activateMap = () => {
  window.main.map.classList.remove(`map--faded`);
  window.form.adForm.classList.remove(`ad-form--disabled`);
  window.form.adForm.addEventListener(`change`, window.form.fieldRoomNumberChangeHandler);
  window.form.adForm.addEventListener(`change`, window.form.fieldTypeChangeHandler);
  window.form.fieldTimeIn.addEventListener(`change`, window.form.fieldTimeOutChangeHandler);
  window.form.fieldTimeOut.addEventListener(`change`, window.form.fieldTimeInChangeHandler);
  window.form.mapPinMain.removeEventListener(`keydown`, pinEnterPressHandler);
  window.main.enableItems(window.form.formElements);
  window.form.setAddress();
  window.backend.load(successHandler, window.message.errorHandler);
  window.form.validateRooms();
  window.form.validateMinPrice();
  window.form.adForm.addEventListener(`submit`, window.form.submitFormHandler);
  window.form.adFormReset.addEventListener(`click`, window.form.resetPage);
};

const pinClickHandler = (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();

    if (window.main.map.classList.contains(`map--faded`)) {
      activateMap();
    }

    window.move.moveMainPin(evt);
  }
};

const pinEnterPressHandler = (evt) => {
  if (evt.key === window.main.Key.ENTER) {
    activateMap();
  }
};

window.form.deactivateMap();

window.form.mapPinMain.addEventListener(`mousedown`, pinClickHandler);
window.form.mapPinMain.addEventListener(`keydown`, pinEnterPressHandler);

window.card.cardRemoveHandler();
