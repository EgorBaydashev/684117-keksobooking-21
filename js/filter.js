'use strict';

(function () {
  const housingType = document.querySelector('#housing-type');

  const housingFilter = function (data, filterElement) {
    if (filterElement.value === 'any') {
      return true;
    }
    return data === filterElement.value;
  };

  const filterData = function (ads) {
    return ads.filter(function (element) {
      return housingFilter(element.offer.type, housingType);
    });
  };

  window.filter = {
    filterData
  };
})();
