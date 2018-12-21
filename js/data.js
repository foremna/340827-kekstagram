'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var arrayPicturesDefault = [];

  var recordPicturesArray = function () { // записывает фотки в новый массив arrayPicturesDefault
    for (var i = 0; i < window.data.pictures.length; i++) {
      arrayPicturesDefault[i] = window.data.pictures[i];
    }
  };

  window.backend.load(function (data) {
    window.data.pictures = data;
    recordPicturesArray();
    window.gallery.createPictures(window.data.pictures);
  }, function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 600px; border-radius: 30px; margin: 0 auto; text-align: center; line-height: 45px; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  });

  window.data = {
    getRandomInRange: getRandomInRange,
    ESC_KEYCODE: ESC_KEYCODE,
    arrayPicturesDefault: arrayPicturesDefault
  };
})();
