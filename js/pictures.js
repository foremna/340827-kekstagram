'use strict';

var commentaries = ['Всё отлично! В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var tags = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
var openPhotoComment = openPhotoSocialComments.querySelector('.social__comment'); // комментарий
var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
var openPhotoCommentsLoader = openPhoto.querySelector('.comments-loader'); // загрузка новых комментариев

var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
.content
.querySelector('.picture');
var pictureImage = pictureTemplate.querySelector('.picture__img'); // фото карточки
var pictureLikes = pictureTemplate.querySelector('.picture__likes'); // лайки карточки
var pictureComments = pictureTemplate.querySelector('.picture__comments'); // описание карточки
var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек

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

var getRandomTastes = function (array) {
  array = shuffleArray(array);

  var randomLength = getRandomInRange(1, array.length);

  return array.slice(1, randomLength).join(', ');
};

var getSidawaysDataArray = function () {
  var picture = [];
  for (var i = 0; i < 26; i++) {
    picture[i] = {
      url: ('photos/' + (i + 1) + '.jpg'), // фото карточки
      likes: getRandomInRange(15, 200), // лайки карточки
      comments: getRandomTastes(commentaries), // описание карточки
      description: getRandElement(tags) // тэг карточки
    };
  }
  return picture;
};

var picture = getSidawaysDataArray();

var createPictures = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 26; i++) {
    var pisturesCards = pictureTemplate.cloneNode(true);
    pictureImage.src = picture[i].url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
    pictureLikes.textContent = picture[i].likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
    pictureComments.textContent = picture[i].comments; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
    fragment.appendChild(pisturesCards);
  }

  containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
};

createPictures();

var createOpenPhoto = function () {
  openPhotoImage.src = picture[0].url;
  openPhotoLikes.textContent = picture[0].likes;
  openPhotoComment.textContent = picture[0].comments;
  openPhotoSocialComments.innerHTML = '<li class=\"social__comment\"><img class=\"social__picture\" src=\"img/avatar-' + getRandomInRange(1, 6) + '.svg\" alt=\"Аватар комментатора фотографии\" width=\"35\" height=\"35\"><p class=\"social__text\">' + picture[1].comments + '</p></li>';
  openPhotoCaption.innerHTML = picture[0].description; // добавляет комментарии из массива
};

var hidesClasses = function () {
  openPhotoCommentsCaption.classList.add('visually-hidden'); // прячет счётчик комментариев
  openPhotoCommentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
};

createOpenPhoto();
hidesClasses();


var uploadPicture = document.querySelector('#upload-file');
var formUploadPhoto = document.querySelector('.img-upload__overlay');

var showEditingFormPhoto = function () { // У formUploadPhoto удаляется класс hidden
  formUploadPhoto.classList.remove('hidden');
};

uploadPicture.addEventListener('change', showEditingFormPhoto); // при нажатии на uploadPicture, у formUploadPhoto удаляется класс hidden

var canselPicture = document.querySelector('#upload-cancel'); // крестик закрытия формы редактирования

canselPicture.addEventListener('click', function () { // при нажатии на canselPicture, у formUploadPhoto добавляется класс hidden
  formUploadPhoto.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) { // при нажатии на escape, у formUploadPhoto добавляется класс hidden
  if (evt.keyCode === ESC_KEYCODE) {
    formUploadPhoto.classList.add('hidden');
  };
});

var picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото

picturesContainer.addEventListener('click', function (evt) { // при нажатии на любую фотку, открывается большое окно с этой фоткой
  if (evt.target.classList.contains('picture__img')) {
    openPhoto.classList.remove('hidden');
  }
});

var pictureCancel = document.querySelector('#picture-cancel'); // крестик закрытия большой фотографии

pictureCancel.addEventListener('click', function () { // при нажатии на pictureCancel, у openPhoto добавляется класс hidden
  openPhoto.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) { // при нажатии на escape, у openPhoto добавляется класс hidden
  if (evt.keyCode === ESC_KEYCODE) {
    openPhoto.classList.add('hidden');
  };
});

var previewPhoto = document.querySelector('.img-upload__preview'); // фото
var listEffects = document.querySelector('.effects__list'); // список всех эффектов
var effectLevel = document.querySelector('.img-upload__effect-level'); // слайдер

var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat']; // массив эффектов

function switchFiltersPhoto (evt) {
  console.log(evt.target, evt.target.id)

  for (var i = 0; i < effects.length; i++) {
    if (evt.target.id === ('effect-' + effects[i])) {
      previewPhoto.classList.add('effects__preview--' + effects[i]);
    } else {
      previewPhoto.classList.remove('effects__preview--' + effects[i]);
    }
  }

  if (evt.target.id === ('effect-' + effects[0])) {
    previewPhoto.classList.add('effects__preview--' + effects[0]);
    effectLevel.classList.add('hidden'); // При выборе эффекта «Оригинал» слайдер скрывается.
  } else {
    previewPhoto.classList.remove(effects[0]);
    effectLevel.classList.remove('hidden'); // При выборе эффекта не «Оригинал» слайдер показывается.
  };
  switchFilterNaturation();
  resetEffectInitialState(); // должен сбрасывать положение пина до начального состояния
}

listEffects.addEventListener('click', switchFiltersPhoto);

var effectLevelPin = document.querySelector('.effect-level__pin'); // пин
var effectValue = document.querySelector('.effect-level__value'); // поле, куда записывается значение вычислений
var effectLine = document.querySelector('.effect-level__line'); // вся линия слайдера
var effectDepth = document.querySelector('.effect-level__depth'); // глубина слайдера

function switchFilterNaturation () { // устанавливает насыщенность фильтра
  var effectPinWidth = effectLevelPin.offsetWidth;
  var effectDepthWidth = effectDepth.offsetWidth;

  var inputEffectCheckeds = document.querySelector('input[name=effect]:checked').value;
  console.log(inputEffectCheckeds);

  var effectValue = (effectDepthWidth / effectLine.offsetWidth);

  function getFilterStyle () {
    switch (inputEffectCheckeds) {
      case 'chrome':
        return 'grayscale(' + effectValue * 1 + ')';
      case 'sepia':
        return 'sepia(' + effectValue * 1 + ')';
      case 'marvin':
        return 'invert(' + effectValue * 100 + '%)';
      case 'phobos':
        return 'blur(' + effectValue * 3 + 'px)';
      case 'heat':
        return 'brightness(' + effectValue * 1 + 2 + ')';
    }
  };

  previewPhoto.style.filter = getFilterStyle();
};

function resetEffectInitialState () { // сбрасывает положение пина до начального состояния
  effectValue;
  inputEffectCheckeds;
  previewPhoto.style.filter = getFilterStyle();
};

effectLevelPin.onmousedown = function (evt) {
  var pinCoords = getCoords(effectLevelPin); // координаты пина
  var shiftX = evt.pageX - effectLevelPin.left;

  var sliderCoords = getCoords(effectLine); // координаты слайдера

  document.onmousemove = function (evt) {
    var newLeft = evt.pageX - sliderCoords.left; // вычесть координату слайдера

    if (newLeft < 0) { // курсор ушел вне слайдера
      newLeft = 0;
    }

    var rightEdge = effectLine.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    effectLevelPin.style.left = newLeft + 'px';
    effectDepth.style.width = newLeft + 'px'; // желтая линия ползет вслед за пином!
    switchFilterNaturation(); // насыщенность фильтра
  };

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null
  };

  return false;
};

function getCoords (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

var scaleControlSmall = document.querySelector('.scale__control--smaller');
var scaleControlBig = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

var PHOTO_VALUE_STEP = 25;
var PHOTO_RESIZE_MIN = 25;
var PHOTO_RESIZE_MAX = 100;

function resizePhoto () {
  scaleControlValue.value = '100%';
  scaleControlSmall.addEventListener('click', increaseZoomPhoto);
  scaleControlBig.addEventListener('click', decreaseZoomPhoto);
};

function increaseZoomPhoto () {
  var photoSize = parseInt(scaleControlValue.value, 10) - PHOTO_VALUE_STEP;
  if (photoSize >= PHOTO_RESIZE_MIN) {
    scaleControlValue.value = photoSize + '%';
    previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
  } else {
    photoSize = PHOTO_RESIZE_MIN;
  }
};

function decreaseZoomPhoto () {
  var photoSize = parseInt(scaleControlValue.value, 10) + PHOTO_VALUE_STEP;
  if (photoSize <= PHOTO_RESIZE_MAX) {
    scaleControlValue.value = photoSize + '%';
    previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
  } else {
    photoSize = PHOTO_RESIZE_MAX;
  }
};

resizePhoto();
