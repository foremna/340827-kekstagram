'use strict';

(function () {
  var createPictures = function (pictures) {
    var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
    .content
    .querySelector('.picture');

    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture, i) {
      var picturesCards = pictureTemplate.cloneNode(true);

      var pictureImage = picturesCards.querySelector('.picture__img'); // фото карточки
      var pictureLikes = picturesCards.querySelector('.picture__likes'); // лайки карточки
      var pictureComments = picturesCards.querySelector('.picture__comments'); // описание карточки
      pictureImage.src = picture.url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
      pictureImage.dataset.id = i;
      pictureLikes.textContent = picture.likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
      pictureComments.textContent = picture.comments.length; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
      fragment.appendChild(picturesCards);
    });

    var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек
    containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
  };

  window.gallery = {
    createPictures: createPictures
  };
})();
