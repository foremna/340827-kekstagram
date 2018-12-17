'use strict';

(function () {
  var DOWN = 'https://js.dump.academy/kekstagram/data';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', DOWN);
    xhr.send(data);
  };
})();
