'use strict';

(function () {
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var successButton = successTemplate.querySelector('.success__button');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorButton = errorTemplate.querySelector('.error__button');
  var main = document.querySelector('main');

  var showSuccessMessage = function () {
    main.appendChild(successTemplate);

    successButton.addEventListener('click', function () {
      main.removeChild(successTemplate);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        main.removeChild(successTemplate);
      }
    });

    successTemplate.addEventListener('click', function (evt) {
      if (!evt.target.closest('.success__inner') === null) {
        main.removeChild(successTemplate);
      }
    });
  };

  var showErrorMessage = function () {
    main.appendChild(errorTemplate);

    errorButton.addEventListener('click', function () {
      main.removeChild(errorTemplate);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        main.removeChild(errorTemplate);
      }
    });

    document.addEventListener('click', function (evt) {
      if (evt.target.closest('#error') === null) {
        main.removeChild(errorTemplate);
      }
    });
  };

  window.popup = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    successButton: successButton,
    errorButton: errorButton
  };

})();
