'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var arrayPicturesDefault = [];

  var recordPicturesArray = function () {
    for (var i = 0; i < window.data.pictures.length; i++) { // записывает фотки в новый массив arrayPicturesDefault
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

// по фильтрам:
// 1) тебе надо сохранять в отдельную переменную полученный с сервера массив картинок и при фильтрации его не изменять (будем создавать новый)

// 2) После нажатия тебе надо определить тип фильтрации - у них просто айдишники, так что можно сделать просто три отдельных обработчика
// id="filter-popular"
// и т.д.

// 2.1) При нажатии убираешь класс img-filters__button img-filters__button--active
// с активной кнопки (или просто со всех)

// и на нажатую кнопке добавляешь класс
// img-filters__button--active

// 3) При фильтрации (нажатии на кнопку фильтра) тебе надо будет брать изначальный массив и создавать на его основе новый массив с помощью циклов.

// Допустим, изначальный массив у тебя называется pictures

// --------------------------------------------------------------------------------------

// Есть несколько фильтров:
// Популярные — фотографии в изначальном порядке.
// Новые — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

// --------------------------------------------------------------------------------------

// Популярное:
// просто делаем копирование массива
// filteredPictures = pictures.slice()

// --------------------------------------------------------------------------------------

// Новые:
// надо получить 10 случайных элементов

// // копируем временный массив
// var tempPictures = pictures.slice()

// // создаем пустой
// var filteredPictures = [];

// // делаем цикл на 10 итераций
// for(int i = 0; i < 10; i++) {

// // получаем случайный элемент массива
// // не забудь заэкспортировать getRandElem
// var index = window.data.getRandomInRange(0, tempPictures.length)

// // добавляем элемент, удаляя из временного массива
// filteredPictures.push(tempPictures.splice(index, 1))

// }

// --------------------------------------------------------------------------------------

// Обсуждаемые, здесь просто сортируем - тоже не очень сложно

// var filteredPictures = pictures.sort(function(a, b) {
// return b.comments.length - a.comments.length;
// })

// ------------------------------------------------------------------------------------—

// 4) после этого тебе надо будет в каждом обработчике очистить галерею

// var pictureElements = document.querySelector('.picture')

// pictureElements.forEach(function(elem) {
// picturesContainer.removeChild(elem)
// })

// 5) и отрисовать новые картинки
// window.gallery.createPictures(filteredPictures);