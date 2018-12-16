'use strict';

(function () {
  var commentaries = ['Всё отлично! В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var tags = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  window.ESC_KEYCODE = 27;

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandElement = function () {
    var rand = Math.floor(Math.random() * tags.length);
    return tags[rand];
  };

  var shuffleArray = function (array) {
    array = array.slice();

    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var getRandomComments = function (array) {
    array = shuffleArray(array);

    var randomLength = getRandomInRange(1, array.length);

    return array.slice(1, randomLength).join(', ');
  };

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
    getRandomInRange: getRandomInRange,
    // picture: picture
  };
})();
