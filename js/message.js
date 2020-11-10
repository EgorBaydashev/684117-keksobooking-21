'use strict';

let main = document.querySelector(`main`);

const submitSuccessHandler = () => {
  let successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  let successElement = successTemplate.cloneNode(true);

  main.insertAdjacentElement(`afterbegin`, successElement);

  document.addEventListener(`keydown`, successMessageEscHandler);
  document.addEventListener(`click`, successMessageClickHandler);
};

const successMessageClose = () => {
  let successElement = document.querySelector(`.success`);
  successElement.remove();

  document.removeEventListener(`keydown`, successMessageEscHandler);
  document.removeEventListener(`click`, successMessageClickHandler);
};

const successMessageClickHandler = () => {
  successMessageClose();
};

const successMessageEscHandler = (evt) => {
  if (evt.key === window.main.Key.ESCAPE) {
    successMessageClose();
  }
};

const errorHandler = (errorMessage) => {
  let errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  let errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector(`.error__message`).textContent = errorMessage;

  let errorButton = errorElement.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, errorButtonClickHandler);

  main.insertAdjacentElement(`afterbegin`, errorElement);

  document.addEventListener(`keydown`, errorMessageEscHandler);
  document.addEventListener(`click`, errorClickHandler);
};

const errorMessageClose = () => {
  let errorElement = document.querySelector(`.error`);
  errorElement.remove();

  document.removeEventListener(`keydown`, errorMessageEscHandler);
  document.removeEventListener(`click`, errorClickHandler);
  document.removeEventListener(`click`, errorButtonClickHandler);
};

const errorButtonClickHandler = () => {
  errorMessageClose();
};

const errorClickHandler = () => {
  errorMessageClose();
};

const errorMessageEscHandler = (evt) => {
  if (evt.key === window.main.Key.ESCAPE) {
    errorMessageClose();
  }
};

window.message = {
  submitSuccessHandler,
  errorHandler
};
