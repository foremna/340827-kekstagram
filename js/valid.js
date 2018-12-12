'use strict';

var imgUploadContainer = document.querySelector('.img-upload__text'); // контейнер для полей
var inputHashtags = imgUploadContainer.querySelector('.text__hashtags'); // поле хэштегов
var textDescription = imgUploadContainer.querySelector('.text__description');

var LENGTH_DESCRIPTION = 140;
var LENGTH_NUMBER = 20;
var QUANTITY_TAG = 5;

var getMessage = {
  beginning: 'Хэш-тег должен начинаться с символа #',
  onetaglength: 'Максимальная длина одного хэш-тега не должна превышать 20 символов',
  maxlength: 'Максимальная длина комментария не должна превышать 140 символов',
  norepeat: 'Хэш-теги не должны повторяться',
  number: 'Должно быть не больше 5 хэш-тегов'
};

var validationDescription = function () {
  textDescription.setCustomValidity(textDescription.value.length > LENGTH_DESCRIPTION ? getMessage.maxlength : '');
};

var validationHashtags = function (evt) {
  var hashtags = evt.target.value.split(' ');
  var spendHashtags = {};
  evt.target.setCustomValidity('');
  hashtags.forEach(function (hashtag) {
    if (hashtag[0] !== '#') {
      evt.target.setCustomValidity(getMessage.beginning);
    }
    if (hashtag.length > LENGTH_NUMBER) {
      evt.target.setCustomValidity(getMessage.onetaglength);
    }
    if (hashtag in spendHashtags) {
      evt.target.setCustomValidity(getMessage.norepeat);
    }
    spendHashtags[hashtag] = true;
  });
  if (hashtags.length > QUANTITY_TAG) {
    evt.target.setCustomValidity(getMessage.number);
  }
};

var validations = function () {
  textDescription.addEventListener('input', validationDescription);
  inputHashtags.addEventListener('input', validationHashtags);
  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.util.hideEditingFormPhotoOnEsc);
  });
  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', window.util.hideEditingFormPhotoOnEsc);
  });
  inputHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.util.hideEditingFormPhotoOnEsc);
  });
  inputHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', window.util.hideEditingFormPhotoOnEsc);
  });
};

validations();
