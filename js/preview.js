'use strict';

(function () {
  var AVATAR_SIZE = 35;
  var MORE_REQUIRED = 5;

  var picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото
  var pictureMin = picturesContainer.querySelectorAll('.picture');
  var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
  var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
  var openPhotoImg = openPhotoImage.querySelector('img');
  var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
  var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

  var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
  var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
  var openPhotoCommentsCount = openPhoto.querySelector('.comments__count');

  var createElement = function (tag, className, text) {
    var certainElement = document.createElement(tag);
    certainElement.classList.add(className);

    if (text) {
      certainElement.textContent = text;
    }
    return certainElement;
  };

  var createImage = function (className, obj) {
    var imageElement = createElement('img', className);
    imageElement.src = obj.avatar;
    imageElement.width = AVATAR_SIZE;
    imageElement.height = AVATAR_SIZE;
    imageElement.alt = obj.name;
    return imageElement;
  };

  var createOpenPhoto = function (pic) { // создание данных для открытой фото
    openPhotoImg.src = pic.url;
    openPhotoImg.alt = 'Случайная фотография';
    openPhotoLikes.textContent = pic.likes;
    openPhotoCaption.textContent = pic.description; // добавляет комментарии из массива

    var commentsAll = document.querySelectorAll('.social__comment');

    var commentsResetOld = function (start) {
      for (var l = start; l < commentsAll.length; l++) {
        openPhotoSocialComments.removeChild(commentsAll[l]);
      }
    };

    commentsResetOld();

    for (var j = 0; j < pic.comments.length; j++) {

      var liElem = createElement('li', 'social__comment');
      var pElem = createElement('p', 'social__text', pic.comments[j].message);
      var imageElem = createImage('social__picture', pic.comments[j]);
      liElem.appendChild(imageElem);
      liElem.appendChild(pElem);
      openPhotoSocialComments.appendChild(liElem);

      if (j >= MORE_REQUIRED) {
        liElem.classList.add('visually-hidden');
      }
    }
  };

  var getInfoOpenPhoto = function (evt) { // при клике на фото, показывает информацию о нем
    for (var i = 0; i < window.data.pictures.length; i++) {
      if (parseInt(evt.target.dataset.id, 10) === i) {
        createOpenPhoto(window.data.pictures[i]);
      }
    }
  };

  picturesContainer.addEventListener('click', getInfoOpenPhoto);

  var form = document.querySelector('.img-upload__form'); // форма редактирования изображения

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function (response) {
      window.util.formUploadPhoto.classList.add('hidden');
      window.popup.showSuccessMessage();
    });
    evt.preventDefault();
  }, function () {
    window.util.formUploadPhoto.classList.add('hidden');
    window.popup.showErrorMessage();
  });

  window.preview = {
    picturesContainer: picturesContainer,
    pictureMin: pictureMin,
    openPhotoCommentsCaption: openPhotoCommentsCaption,
    openPhotoCommentsCount: openPhotoCommentsCount,
    openPhoto: openPhoto
  };
})();
