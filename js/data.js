'use strict';

(function () {
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

  const getData = function () {
    let randomArr = [];

    for (let i = 1; i <= ADS_QUANTITY; i++) {
      let ad = {
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: window.main.getRandomValueFromArray(TITLES),
          address: '',
          price: window.main.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: window.main.getRandomValueFromArray(TYPES),
          rooms: window.main.getRandomValueFromArray(ROOMS),
          guests: window.main.getRandomValueFromArray(GUESTS),
          checkin: window.main.getRandomValueFromArray(TIMES),
          checkout: window.main.getRandomValueFromArray(TIMES),
          features: window.main.getArrRandomLength(FEATURES),
          description: DESCRIPTION,
          photos: window.main.getArrRandomLength(PHOTOS)
        },
        location: {
          x: window.main.getRandomNumber(PIN_X_MIN, PIN_X_MAX),
          y: window.main.getRandomNumber(PIN_Y_MIN, PIN_Y_MAX)
        }
      };

      ad.offer.address = `${ad.location.x}, ${ad.location.y}`;
      randomArr.push(ad);
    }
    return randomArr;
  };

  getData();
  const resultData = getData();

  window.data = {
    resultData,
    PIN_X_MIN,
    PIN_X_MAX,
    PIN_Y_MIN,
    PIN_Y_MAX
  };
})();
