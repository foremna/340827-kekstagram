'use strict';

(function () {
  window.picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото
  window.openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
  var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
  var openPhotoImg = openPhotoImage.querySelector('img');
  var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
  var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

  var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
  var openPhotoComment = openPhotoSocialComments.querySelector('.social__comment'); // комментарий
  var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
  var openPhotoCommentsLoader = openPhoto.querySelector('.comments-loader'); // загрузка новых комментариев

  var createOpenPhoto = function (pic) { // создание данных для открытой фото
    openPhotoImg.src = pic.url;
    openPhotoImg.alt = 'Случайная фотография';
    openPhotoLikes.textContent = pic.likes;
    openPhotoComment.textContent = pic.comments;
    openPhotoSocialComments.innerHTML = '<li class=\"social__comment\"><img class=\"social__picture\" src=\"img/avatar-' + window.getRandomInRange(1, 6) + '.svg\" alt=\"Аватар комментатора фотографии\" width=\"35\" height=\"35\"><p class=\"social__text\">' + pic.comments + '</p></li>';
    openPhotoCaption.innerHTML = pic.description; // добавляет комментарии из массива
  };

  var getInfoOpenPhoto = function (evt) { // при клике на фото, показывает информацию о нем
    for (var i = 0; i < picture.length; i++) {
      if (parseInt(evt.target.dataset.id, 10) === i) {
        createOpenPhoto(picture[i]);
      }
    }
  };

  picturesContainer.addEventListener('click', getInfoOpenPhoto);

  var hidesClasses = function () {
    openPhotoCommentsCaption.classList.add('visually-hidden'); // прячет счётчик комментариев
    openPhotoCommentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
  };

  hidesClasses();

  // window.picturesContainer = picturesContainer;
})();
