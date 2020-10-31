'use strict';

(function () {
  const ADS_QUANTITY = 8;
  const PIN_X_OFFSET = 50;
  const PIN_Y_OFFSET = 70;

  const similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  const renderPin = function (ad) {
    let pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style = `left: ${ad.location.x + PIN_X_OFFSET}px; top: ${(ad.location.y + PIN_Y_OFFSET)}px`;
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    pinElement.addEventListener('click', function () {
      pinOpenHandler(ad);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        pinOpenHandler(ad);
      }
    });

    return pinElement;
  };

  const similarPinList = document.querySelector('.map__pins');

  const successHandler = function (pins) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < ADS_QUANTITY; i++) {
      let pin = window.main.getRandomValueFromArray(pins);
      fragment.appendChild(renderPin(pin));
    }
    similarPinList.appendChild(fragment);
  };

  const pinOpenHandler = function (ad) {
    window.card.cardRemoveHandler();
    window.card.renderCard(ad);
  };

  window.pin = {
    successHandler,
    PIN_X_OFFSET,
    PIN_Y_OFFSET
  };
})();
