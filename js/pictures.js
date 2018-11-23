'use strict';

var commentaries = ['Всё отлично! В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var tag = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function () {
  var rand = Math.floor(Math.random() * tag.length);
  return tag[rand];
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

var getRandomTastes = function (array) {
  array = shuffleArray(array);

  var randomLength = getRandomInRange(1, array.length);

  return array.slice(1, randomLength).join(', ');
};

var getSidawaysDataArray = function () {
  var picture = [];
  for (var i = 1; i < 27; i++) {
    picture[i] = {
      url: ('photos/' + i + '.jpg'), // фото карточки
      likes: getRandomInRange(15, 200), // лайки карточки
      comments: getRandomTastes(commentaries), // описание карточки
      description: getRandElement(tag) // тэг карточки
    };
  }
  return picture;
};

var picture = getSidawaysDataArray();

var createPictures = function () {
  var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
  .content
  .querySelector('.picture');
  var pictureImage = pictureTemplate.querySelector('.picture__img'); // фото карточки
  var pictureLikes = pictureTemplate.querySelector('.picture__likes'); // лайки карточки
  var pictureComments = pictureTemplate.querySelector('.picture__comments'); // описание карточки
  var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек
  var fragment = document.createDocumentFragment();

  for (var i = 1; i < 27; i++) {
    var pisturesCards = pictureTemplate.cloneNode(true);
    pictureImage.src = picture[i].url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
    pictureLikes.textContent = picture[i].likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
    pictureComments.textContent = picture[i].comments; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
    fragment.appendChild(pisturesCards);
  }

  containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
};

createPictures();

var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
// openPhoto.classList.remove('hidden'); // убирает скрывающий класс у блока открытой фотографии // ВРЕМЕННО ЗАКРЫТ, ПОКА РАЗРАБАТЫВАЕТСЯ КОД ЗАГРУЗКИ ФОТО
var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
// var openPhotoDescribe = openPhoto.querySelector('.comments-count'); // описание открытой фотографии
var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
var openPhotoComment = openPhotoSocialComments.querySelector('.social__comment'); // комментарий
var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
var openPhotoCommentsLoader = openPhoto.querySelector('.comments-loader'); // загрузка новых комментариев

var createOpenPhoto = function () {
  openPhotoImage.src = picture[1].url;
  openPhotoLikes.textContent = picture[1].likes;
  openPhotoComment.textContent = picture[1].comments;
  openPhotoSocialComments.innerHTML = '<li class=\"social__comment\"><img class=\"social__picture\" src=\"img/avatar-' + getRandomInRange(1, 6) + '.svg\" alt=\"Аватар комментатора фотографии\" width=\"35\" height=\"35\"><p class=\"social__text\">' + picture[1].comments + '</p></li>';
  openPhotoCaption.innerHTML = picture[1].description; // добавляет комментарии из массива
};

createOpenPhoto();

var hidesClasses = function () {
  openPhotoCommentsCaption.classList.add('visually-hidden'); // прячет счётчик комментариев
  openPhotoCommentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
};

hidesClasses();


