'use strict';

(function () {
  var uploadPicture = document.querySelector('#upload-file'); // кнопка загрузки фото "О"
  var formUploadPhoto = document.querySelector('.img-upload__overlay'); // форма редактирования фото
  var body = document.querySelector('body');

  var showEditingFormPhoto = function () { // У formUploadPhoto удаляется класс hidden
    formUploadPhoto.classList.remove('hidden');
  };

  uploadPicture.addEventListener('change', showEditingFormPhoto); // при загрузки фото, у formUploadPhoto удаляется класс hidden

  var canselPicture = document.querySelector('#upload-cancel'); // крестик закрытия формы редактирования

  var hideEditingFormPhoto = function () {
    formUploadPhoto.classList.add('hidden');
  };

  canselPicture.addEventListener('click', hideEditingFormPhoto); // при нажатии на canselPicture, у formUploadPhoto добавляется класс hidden

  var hideEditingFormPhotoOnEsc = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      formUploadPhoto.classList.add('hidden');
    }
  };

  document.addEventListener('keydown', hideEditingFormPhotoOnEsc); // при нажатии на escape, у formUploadPhoto добавляется класс hidden

  var showOpenPhoto = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      window.preview.openPhoto.classList.remove('hidden');
      body.classList.add('modal-open');
    }
  };

  window.preview.picturesContainer.addEventListener('click', showOpenPhoto); // при нажатии на любую фотку, открывается большое окно с этой фоткой

  var pictureCancel = document.querySelector('#picture-cancel'); // крестик закрытия большой фотографии

  var hideOpenPhoto = function () {
    window.preview.openPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  pictureCancel.addEventListener('click', hideOpenPhoto); // при нажатии на pictureCancel, у openPhoto добавляется класс hidden

  var hideOpenPhotoEsc = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.preview.openPhoto.classList.add('hidden');
    }
  };

  document.addEventListener('keydown', hideOpenPhotoEsc); // при нажатии на escape, у openPhoto добавляется класс hidden

  window.util = {
    hideEditingFormPhotoOnEsc: hideEditingFormPhotoOnEsc,
    formUploadPhoto: formUploadPhoto
  };
})();
