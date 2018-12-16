'use strict';

(function () {
  var createPictures = function (pictures) {
    var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
    .content
    .querySelector('.picture');
    var pictureImage = pictureTemplate.querySelector('.picture__img'); // фото карточки
    var pictureLikes = pictureTemplate.querySelector('.picture__likes'); // лайки карточки
    var pictureComments = pictureTemplate.querySelector('.picture__comments'); // описание карточки
    var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      var pisturesCards = pictureTemplate.cloneNode(true);
      pictureImage.src = pictures[i].url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
      pictureImage.dataset.id = i;
      pictureLikes.textContent = pictures[i].likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
      pictureComments.textContent = pictures[i].comments.length; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
      fragment.appendChild(pisturesCards);
    }

    containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
  };

  window.gallery = {
    createPictures: createPictures
  };
})();
