'use strict';

const MAX_FILTERED_ADS = 5;

const housingType = document.querySelector(`#housing-type`);
const housingPrice = document.querySelector(`#housing-price`);
const housingRooms = document.querySelector(`#housing-rooms`);
const housingGuests = document.querySelector(`#housing-guests`);

let priceToRoom = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 49999
  },
  high: {
    min: 50000,
    max: Infinity
  }
};

const filterHousing = (data, filter) => {
  if (filter.value === `any`) {
    return true;
  }
  return data.toString() === filter.value;
};

const filterHousingPrice = (data, filter) => {
  if (filter.value === `any`) {
    return true;
  }
  return data >= priceToRoom[filter.value].min && data <= priceToRoom[filter.value].max;
};

const filterHousingCheckbox = (data) => {
  let housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(housingCheckbox).every((feature) => data.indexOf(feature.value) >= 0);
};

const filterData = (ads) => {
  let filteredAdverts = [];
  for (let i = 0; i < ads.length; i++) {
    if (filterHousing(ads[i].offer.type, housingType) &&
      filterHousingPrice(ads[i].offer.price, housingPrice) &&
      filterHousing(ads[i].offer.rooms, housingRooms) &&
      filterHousing(ads[i].offer.guests, housingGuests) &&
      filterHousingCheckbox(ads[i].offer.features)) {
      filteredAdverts.push(ads[i]);
    }

    if (filteredAdverts.length === MAX_FILTERED_ADS) {
      break;
    }
  }
  return filteredAdverts;
};

window.filter = {
  filterData
};
