'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var photoPreview = uploadSelectImage.querySelector('.img-upload__preview img');
  var fileChooser = uploadSelectImage.querySelector('#upload-file');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
