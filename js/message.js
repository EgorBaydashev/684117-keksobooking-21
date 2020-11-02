'use strict';

(function () {
  let main = document.querySelector('main');

  const submitSuccessHandler = function () {
    let successTemplate = document.querySelector('#success').content.querySelector('.success');
    let successElement = successTemplate.cloneNode(true);

    main.insertAdjacentElement('afterbegin', successElement);

    document.addEventListener('keydown', successMessageEscHandler);
    document.addEventListener('click', successMessageClickHandler);
  };

  const successMessageClose = function () {
    let successElement = document.querySelector('.success');
    successElement.remove();

    document.removeEventListener('keydown', successMessageEscHandler);
    document.removeEventListener('click', successMessageClickHandler);
  };

  const successMessageClickHandler = function () {
    successMessageClose();
  };

  const successMessageEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      successMessageClose();
    }
  };

  const errorHandler = function (errorMessage) {
    let errorTemplate = document.querySelector('#error').content.querySelector('.error');
    let errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;

    let errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);

    main.insertAdjacentElement('afterbegin', errorElement);

    document.addEventListener('keydown', errorMessageEscHandler);
    document.addEventListener('click', errorClickHandler);
  };

  const errorMessageClose = function () {
    let errorElement = document.querySelector('.error');
    errorElement.remove();

    document.removeEventListener('keydown', errorMessageEscHandler);
    document.removeEventListener('click', errorClickHandler);
    document.removeEventListener('click', errorButtonClickHandler);
  };

  const errorButtonClickHandler = function () {
    errorMessageClose();
  };

  const errorClickHandler = function () {
    errorMessageClose();
  };

  const errorMessageEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      errorMessageClose();
    }
  };

  window.message = {
    submitSuccessHandler,
    errorHandler
  };
})();
