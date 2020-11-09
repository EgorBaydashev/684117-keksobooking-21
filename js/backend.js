'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const statusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

const load = (onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case statusCode.OK:
        onSuccess(xhr.response);
        break;

      case statusCode.BAD_REQUEST:
        onError(`Неверный запрос`);
        break;

      case statusCode.NOT_FOUND:
        onError(`Ничего не найдено`);
        break;

      default:
        onError(`Cтатус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });

  if (data) {
    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  } else {
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  }
};

window.backend = {
  load
};
