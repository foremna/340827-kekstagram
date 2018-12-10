'use strict';

(function () {
  var scaleControlSmall = document.querySelector('.scale__control--smaller');
  var scaleControlBig = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var PHOTO_VALUE_STEP = 25;
  var PHOTO_RESIZE_MIN = 25;
  var PHOTO_RESIZE_MAX = 100;

  var increaseZoomPhoto = function () {
    var photoSize = parseInt(scaleControlValue.value, 10) - PHOTO_VALUE_STEP;
    if (photoSize >= PHOTO_RESIZE_MIN) {
      scaleControlValue.value = photoSize + '%';
      window.previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
    } else {
      photoSize = PHOTO_RESIZE_MIN;
    }
  };

  var decreaseZoomPhoto = function () {
    var photoSize = parseInt(scaleControlValue.value, 10) + PHOTO_VALUE_STEP;
    if (photoSize <= PHOTO_RESIZE_MAX) {
      scaleControlValue.value = photoSize + '%';
      window.previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
    } else {
      photoSize = PHOTO_RESIZE_MAX;
    }
  };

  var resizePhoto = function () {
    scaleControlValue.value = '100%';
    scaleControlSmall.addEventListener('click', increaseZoomPhoto);
    scaleControlBig.addEventListener('click', decreaseZoomPhoto);
  };

  resizePhoto();
})();
