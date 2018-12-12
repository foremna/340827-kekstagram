'use strict';

(function () {
  var createPictures = function () {
    var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
    .content
    .querySelector('.picture');
    var pictureImage = pictureTemplate.querySelector('.picture__img'); // фото карточки
    var pictureLikes = pictureTemplate.querySelector('.picture__likes'); // лайки карточки
    var pictureComments = pictureTemplate.querySelector('.picture__comments'); // описание карточки
    var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 26; i++) {
      var pisturesCards = pictureTemplate.cloneNode(true);
      pictureImage.src = window.picture[i].url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
      pictureImage.dataset.id = i;
      pictureLikes.textContent = window.picture[i].likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
      pictureComments.textContent = window.picture[i].comments; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
      fragment.appendChild(pisturesCards);
    }

    containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
  };
  createPictures();
})();
