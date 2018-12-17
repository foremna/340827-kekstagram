'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.backend.load(function (data) {
    window.data.pictures = data;
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
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
