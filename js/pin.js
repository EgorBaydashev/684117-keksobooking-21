'use strict';

(function () {
  const MAX_QUANTITY = 5;
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

  const renderPins = function (pins) {
    let fragment = document.createDocumentFragment();
    let filteredPins = window.filter.filterData(pins).slice(0, MAX_QUANTITY);

    filteredPins.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    similarPinList.appendChild(fragment);
  };

  const pinOpenHandler = function (ad) {
    window.card.cardRemoveHandler();
    window.card.renderCard(ad);
  };

  window.pin = {
    renderPins,
    PIN_X_OFFSET,
    PIN_Y_OFFSET
  };
})();
