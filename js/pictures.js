// модуль создания данных data.js
'use strict';

var commentaries = ['Всё отлично! В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var tags = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var ESC_KEYCODE = 27;

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

var getSidawaysDataArray = function () {
  var picture = [];
  for (var i = 0; i < 26; i++) {
    picture[i] = {
      url: ('photos/' + (i + 1) + '.jpg'), // фото карточки
      likes: getRandomInRange(15, 200), // лайки карточки
      comments: getRandomComments(commentaries), // описание карточки
      description: getRandElement(tags) // тэг карточки
    };
  }
  return picture;
};

var picture = getSidawaysDataArray();


// модуль создания галлереи gallery.js

var createPictures = function () {
  var pictureTemplate = document.querySelector('#picture') // шаблон карточки товара
  .content
  .querySelector('.picture');
  var pictureImage = pictureTemplate.querySelector('.picture__img'); // фото карточки
  var pictureLikes = pictureTemplate.querySelector('.picture__likes'); // лайки карточки
  var pictureComments = pictureTemplate.querySelector('.picture__comments'); // описание карточки
  var containerPictures = document.querySelector('.pictures'); // контейнер для хранения карточек

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 26; i++) {
    var pisturesCards = pictureTemplate.cloneNode(true);
    pictureImage.src = picture[i].url; // на каждой иттерации цикла берем из объекта значение url-фотку из массива picture
    pictureImage.dataset.id = i;
    pictureLikes.textContent = picture[i].likes; // на каждой иттерации цикла берем из объекта значение likes-лайки из массива picture
    pictureComments.textContent = picture[i].comments; // на каждой иттерации цикла берем из объекта значение comments-описание из массива picture
    fragment.appendChild(pisturesCards);
  }

  containerPictures.appendChild(fragment); // отрисовывает в контейнере карточки
};

createPictures();

// модуль создания миниатюры preview.js

var picturesContainer = document.querySelector('.pictures'); // контейнер для всех фото
var openPhoto = document.querySelector('.big-picture'); // блок открытой фотографии
var openPhotoImage = openPhoto.querySelector('.big-picture__img'); // фото открытой фотографии
var openPhotoImg = openPhotoImage.querySelector('img');
var openPhotoLikes = openPhoto.querySelector('.likes-count'); // лайки открытой фотографии
var openPhotoCaption = openPhoto.querySelector('.social__caption'); // комментарий открытой фотографии

var openPhotoSocialComments = openPhoto.querySelector('.social__comments'); // блок с комментариями
var openPhotoComment = openPhotoSocialComments.querySelector('.social__comment'); // комментарий
var openPhotoCommentsCaption = openPhoto.querySelector('.social__comment-count'); // счётчик комментариев
var openPhotoCommentsLoader = openPhoto.querySelector('.comments-loader'); // загрузка новых комментариев

var createOpenPhoto = function (pic) { // создание данных для открытой фото
  openPhotoImg.src = pic.url;
  openPhotoImg.alt = 'Случайная фотография';
  openPhotoLikes.textContent = pic.likes;
  openPhotoComment.textContent = pic.comments;
  openPhotoSocialComments.innerHTML = '<li class=\"social__comment\"><img class=\"social__picture\" src=\"img/avatar-' + getRandomInRange(1, 6) + '.svg\" alt=\"Аватар комментатора фотографии\" width=\"35\" height=\"35\"><p class=\"social__text\">' + pic.comments + '</p></li>';
  openPhotoCaption.innerHTML = pic.description; // добавляет комментарии из массива
};

var getInfoOpenPhoto = function (evt) { // при клике на фото, показывает информацию о нем
  for (var i = 0; i < picture.length; i++) {
    if (parseInt(evt.target.dataset.id, 10) === i) {
      createOpenPhoto(picture[i]);
    }
  }
};

picturesContainer.addEventListener('click', getInfoOpenPhoto);

var hidesClasses = function () {
  openPhotoCommentsCaption.classList.add('visually-hidden'); // прячет счётчик комментариев
  openPhotoCommentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
};

hidesClasses();

// модуль вспомогательный util.js

var uploadPicture = document.querySelector('#upload-file'); // кнопка загрузки фото "О"
var formUploadPhoto = document.querySelector('.img-upload__overlay'); // форма редактирования фото

var showEditingFormPhoto = function () { // У formUploadPhoto удаляется класс hidden
  formUploadPhoto.classList.remove('hidden');
};

uploadPicture.addEventListener('change', showEditingFormPhoto); // при загрузки фото, у formUploadPhoto удаляется класс hidden

var canselPicture = document.querySelector('#upload-cancel'); // крестик закрытия формы редактирования

var hideEditingFormPhoto = function () {
  formUploadPhoto.classList.add('hidden');
};

canselPicture.addEventListener('click', hideEditingFormPhoto); // при нажатии на canselPicture, у formUploadPhoto добавляется класс hidden

var hideEditingFormPhotoOnEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    formUploadPhoto.classList.add('hidden');
  }
};

document.addEventListener('keydown', hideEditingFormPhotoOnEsc); // при нажатии на escape, у formUploadPhoto добавляется класс hidden

var showOpenPhoto = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    openPhoto.classList.remove('hidden');
  }
};

picturesContainer.addEventListener('click', showOpenPhoto); // при нажатии на любую фотку, открывается большое окно с этой фоткой

var pictureCancel = document.querySelector('#picture-cancel'); // крестик закрытия большой фотографии

var hideOpenPhoto = function () {
  openPhoto.classList.add('hidden');
};

pictureCancel.addEventListener('click', hideOpenPhoto); // при нажатии на pictureCancel, у openPhoto добавляется класс hidden

var hideOpenPhotoEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    openPhoto.classList.add('hidden');
  }
};

document.addEventListener('keydown', hideOpenPhotoEsc); // при нажатии на escape, у openPhoto добавляется класс hidden

// модуль создания открытой фотографии для редактирования picture.js

var previewPhoto = document.querySelector('.img-upload__preview'); // фото
var listEffects = document.querySelector('.effects__list'); // список всех эффектов
var effectLevel = document.querySelector('.img-upload__effect-level'); // слайдер

var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat']; // массив эффектов

var switchFiltersPhoto = function (evt) {
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
  }

  switchFilterNaturation();
  resetEffectInitialState(); // должен сбрасывать положение пина до начального состояния
};

listEffects.addEventListener('click', switchFiltersPhoto);

var effectLevelPin = document.querySelector('.effect-level__pin'); // пин
var effectLine = document.querySelector('.effect-level__line'); // вся линия слайдера
var effectDepth = document.querySelector('.effect-level__depth'); // глубина слайдера

var switchFilterNaturation = function () { // устанавливает насыщенность фильтра
  var effectDepthWidth = effectDepth.offsetWidth;

  window.inputEffectCheckeds = document.querySelector('input[name=effect]:checked').value;

  var effectProportion = (effectDepthWidth / effectLine.offsetWidth);

  var getFilterStyle = function () {
    switch (window.inputEffectCheckeds) {
      case 'chrome':
        return 'grayscale(' + effectProportion * 1 + ')';
      case 'sepia':
        return 'sepia(' + effectProportion * 1 + ')';
      case 'marvin':
        return 'invert(' + effectProportion * 100 + '%)';
      case 'phobos':
        return 'blur(' + effectProportion * 3 + 'px)';
      case 'heat':
        return 'brightness(' + effectProportion * 1 + 2 + ')';
      default: return;
    }
  };

  previewPhoto.style.filter = getFilterStyle();
};

var resetNaturations = function () { // сброс насыщенности по умолчанию
  switch (window.inputEffectCheckeds) {
    case 'chrome':
      return 'grayscale(1)';
    case 'sepia':
      return 'sepia(1)';
    case 'marvin':
      return 'invert(100%)';
    case 'phobos':
      return 'blur(5px)';
    case 'heat':
      return 'brightness(3)';
    default: return;
  }
};

var resetPinPosition = function () { // сбрасывает положение пина до начального состояния
  effectLevelPin.style.left = '100%';
  effectDepth.style.width = '100%';
};

var resetEffectInitialState = function () { // при переключении эффекта сбрасывает положение пина и насыщенность эффекта
  previewPhoto.style.filter = resetNaturations();
  resetPinPosition();
};

effectLevelPin.onmousedown = function (evt) {
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
    document.onmousemove = document.onmouseup = null;
  };

  return false;
};

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

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
    previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
  } else {
    photoSize = PHOTO_RESIZE_MIN;
  }
};

var decreaseZoomPhoto = function () {
  var photoSize = parseInt(scaleControlValue.value, 10) + PHOTO_VALUE_STEP;
  if (photoSize <= PHOTO_RESIZE_MAX) {
    scaleControlValue.value = photoSize + '%';
    previewPhoto.style.transform = 'scale(' + photoSize / PHOTO_RESIZE_MAX + ')';
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

var imgUploadContainer = document.querySelector('.img-upload__text'); // контейнер для полей
var inputHashtags = imgUploadContainer.querySelector('.text__hashtags'); // поле хэштегов
var textDescription = imgUploadContainer.querySelector('.text__description');

var LENGTH_DESCRIPTION = 140;
var LENGTH_NUMBER = 20;
var QUANTITY_TAG = 5;

var getMessage = {
  beginning: 'Хэш-тег должен начинаться с символа #',
  onetaglength: 'Максимальная длина одного хэш-тега не должна превышать 20 символов',
  maxlength: 'Максимальная длина комментария не должна превышать 140 символов',
  norepeat: 'Хэш-теги не должны повторяться',
  number: 'Должно быть не больше 5 хэш-тегов'
};

var validationDescription = function () {
  textDescription.setCustomValidity(textDescription.value.length > LENGTH_DESCRIPTION ? getMessage.maxlength : '');
};

var validationHashtags = function (evt) {
  var hashtags = evt.target.value.split(' ');
  var spendHashtags = {};
  evt.target.setCustomValidity('');
  hashtags.forEach(function (hashtag) {
    if (hashtag[0] !== '#') {
      evt.target.setCustomValidity(getMessage.beginning);
    }
    if (hashtag.length > LENGTH_NUMBER) {
      evt.target.setCustomValidity(getMessage.onetaglength);
    }
    if (hashtag in spendHashtags) {
      evt.target.setCustomValidity(getMessage.norepeat);
    }
    spendHashtags[hashtag] = true;
  });
  if (hashtags.length > QUANTITY_TAG) {
    evt.target.setCustomValidity(getMessage.number);
  }
};

var validations = function () {
  textDescription.addEventListener('input', validationDescription);
  inputHashtags.addEventListener('input', validationHashtags);
  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', hideEditingFormPhotoOnEsc);
  });
  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', hideEditingFormPhotoOnEsc);
  });
  inputHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', hideEditingFormPhotoOnEsc);
  });
  inputHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', hideEditingFormPhotoOnEsc);
  });
};

validations();
