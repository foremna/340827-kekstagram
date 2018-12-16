'use strict';

(function () {
  var DOWN = 'https://js.dump.academy/kekstagram/data';
  var UPL = 'https://js.dump.academy/kekstagram';


  window.load = function (onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', DOWN);

    xhr.addEventListener('load', function () {
      onSucces(xhr.response);
    });

    xhr.send();
  };
})();