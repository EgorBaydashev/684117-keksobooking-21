'use strict';

(function () {
  const moveMainPin = function (evt) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      let minCoordsX = window.data.PIN_X_MIN - window.pin.PIN_X_OFFSET / 2;
      let maxCoordsX = window.data.PIN_X_MAX - window.pin.PIN_X_OFFSET / 2;
      let minCoordsY = window.data.PIN_Y_MIN - window.pin.PIN_Y_OFFSET;
      let maxCoordsY = window.data.PIN_Y_MAX - window.pin.PIN_Y_OFFSET;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.form.mapPinMain.style.top = `${(window.form.mapPinMain.offsetTop - shift.y)}px`;
      window.form.mapPinMain.style.left = `${(window.form.mapPinMain.offsetLeft - shift.x)}px`;

      if (window.form.mapPinMain.offsetLeft < minCoordsX) {
        window.form.mapPinMain.style.left = `${minCoordsX}px`;
      } else if (window.form.mapPinMain.offsetLeft > maxCoordsX) {
        window.form.mapPinMain.style.left = `${maxCoordsX}px`;
      }

      if (window.form.mapPinMain.offsetTop < minCoordsY) {
        window.form.mapPinMain.style.top = `${minCoordsY}px`;
      } else if (window.form.mapPinMain.offsetTop > maxCoordsY) {
        window.form.mapPinMain.style.top = `${maxCoordsY}px`;
      }

      window.form.setAddress();
    };

    const mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.move = {
    moveMainPin
  };
})();
