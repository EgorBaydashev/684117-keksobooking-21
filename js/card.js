'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filtersContainer = window.main.map.querySelector(`.map__filters-container`);

const typesOffers = {
  flat: {
    ru: `Квартира`,
    minPrice: `1000`
  },
  bungalow: {
    ru: `Бунгало`,
    minPrice: `0`
  },
  house: {
    ru: `Дом`,
    minPrice: `5000`
  },
  palace: {
    ru: `Дворец`,
    minPrice: `10000`
  }
};

const cardRemoveHandler = () => {
  let card = window.main.map.querySelector(`.map__card`);

  if (card) {
    let popupClose = card.querySelector(`.popup__close`);

    card.remove();

    popupClose.removeEventListener(`click`, cardRemoveHandler);
    document.removeEventListener(`keydown`, cardEscPressHandler);
  }
};

const cardEscPressHandler = (evt) => {
  if (evt.key === window.main.Key.ESCAPE) {
    cardRemoveHandler();
  }
};

const getCard = (card) => {
  let cardElement = cardTemplate.cloneNode(true);
  let popupClose = cardElement.querySelector(`.popup__close`);

  cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = typesOffers[card.offer.type].ru;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${window.main.getNoun(card.offer.rooms, ` комната для`, ` комнаты для `, ` комнат для `)}${window.main.getNoun(card.offer.guests, ` гостя `, ` гостей `, ` гостей `)}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  let featureItems = cardElement.querySelectorAll(`.popup__feature`);

  for (let i = 0; i < featureItems.length; i++) {
    if (featureItems[i].indexOf === card.offer.features[i]) {
      featureItems[i].remove();
    }
  }

  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;

  let photoElement = cardElement.querySelector(`.popup__photos`);
  let photo = photoElement.querySelector(`img`);

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

  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);

  popupClose.addEventListener(`click`, cardRemoveHandler);
  document.addEventListener(`keydown`, cardEscPressHandler);

  return cardElement;
};

const renderCard = (ad) => {
  filtersContainer.insertAdjacentElement(`beforebegin`, getCard(ad));
};

window.card = {
  renderCard,
  typesOffers,
  cardRemoveHandler
};
