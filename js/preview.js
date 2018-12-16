'use strict';

(function () {
  var AVATAR_SIZE = 35;

  var picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото
  var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
  var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
  var openPhotoImg = openPhotoImage.querySelector('img');
  var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
  var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

  var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
  var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
  var openPhotoCommentsLoader = openPhoto.querySelector('.comments-loader'); // загрузка новых комментариев

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

    for (var j = 0; j < pic.comments.length; j++) {

      var liElem = createElement('li', 'social__comment');
      var pElem = createElement('p', 'social__text', pic.comments[j].message);
      var imageElem = createImage('social__picture', pic.comments[j]);
      liElem.appendChild(imageElem);
      liElem.appendChild(pElem);
      openPhotoSocialComments.appendChild(liElem);
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

  var hidesClasses = function () {
    openPhotoCommentsCaption.classList.add('visually-hidden'); // прячет счётчик комментариев
    openPhotoCommentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
  };

  hidesClasses();

  var form = document.querySelector('.img-upload__form'); // форма редактирования изображения

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.util.formUploadPhoto.classList.add('hidden');
    });
    evt.preventDefault();
  });

  window.preview = {
    picturesContainer: picturesContainer,
    openPhoto: openPhoto
  };
})();
