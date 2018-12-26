'use strict';

(function () {
  var AVATAR_SIZE = 35;
  var MORE_REQUIRED = 5;

  var picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото
  var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
  var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
  var openPhotoImg = openPhotoImage.querySelector('img');
  var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
  var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

  var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
  var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
  var openPhotoCommentsCount = openPhoto.querySelector('.comments__count');
  var btnCommentsLoader = openPhoto.querySelector('.social__comments-loader');

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

    openPhotoCommentsCaption.innerHTML = 'N из ' + '<span class="comments-count">' + pic.comments.length + '</span>' + ' комментариев';

    var comments = document.querySelectorAll('.social__comment');

    var commentsResetOld = function () {
      comments.forEach(function (comment) { // вариант 2
        openPhotoSocialComments.removeChild(comment);
      });
    };

    commentsResetOld();

    pic.comments.forEach(function (comment, i) { // показывает все комменты, а не 5
      var liElem = createElement('li', 'social__comment');
      var pElem = createElement('p', 'social__text', comment.message);
      var imageElem = createImage('social__picture', comment);
      liElem.appendChild(imageElem);
      liElem.appendChild(pElem);
      openPhotoSocialComments.appendChild(liElem);

      if (i >= MORE_REQUIRED) {
        liElem.classList.add('visually-hidden');
      }

      btnCommentsLoader.addEventListener('click', function () {
        if (i > MORE_REQUIRED) {
          liElem.classList.remove('visually-hidden'); // показывает все, но нет последнего
        }
        btnCommentsLoader.classList.add('visually-hidden');
      });
    });
  };

  var getInfoOpenPhoto = function (evt) {
    window.data.pictures.forEach(function (picture, i) { // при клике на фото, показывает информацию о нем
      if (parseInt(evt.target.dataset.id, 10) === i) {
        createOpenPhoto(picture);
      }
    });
  };

  picturesContainer.addEventListener('click', getInfoOpenPhoto);

  var form = document.querySelector('.img-upload__form'); // форма редактирования изображения

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
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
    openPhotoCommentsCaption: openPhotoCommentsCaption,
    openPhotoCommentsCount: openPhotoCommentsCount,
    openPhoto: openPhoto
  };
})();
