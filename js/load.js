'use strict';

(function () {
  const URL_LOAD = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT_IN_MS = 10000;

  const statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          onSuccess(xhr.response);
          break;

        case statusCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;

        case statusCode.NOT_FOUND:
          onError('Ничего не найдено');
          break;

        default:
          onError(`Cтатус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  const errorHandler = function (errorMessage) {
    let errorTemplate = document.querySelector('#error').content.querySelector('.error');
    let errorElement = errorTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.load = {
    load,
    errorHandler
  };
})();
