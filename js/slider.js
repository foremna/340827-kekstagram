'use strict';

(function () {
  var previewPhoto = document.querySelector('.img-upload__preview'); // фото
  var listEffects = document.querySelector('.effects__list'); // список всех эффектов
  var effectLevel = document.querySelector('.img-upload__effect-level'); // слайдер

  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat']; // массив эффектов

  var switchFiltersPhoto = function (evt) {
    effects.forEach(function (effect) {
      if (evt.target.id === ('effect-' + effect)) {
        previewPhoto.classList.add('effects__preview--' + effect);
      } else {
        previewPhoto.classList.remove('effects__preview--' + effect);
      }
    });

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
        default: return 'none';
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
      default: return 'none';
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

  effectLevelPin.onmousedown = function () {
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

  window.slider = {
    previewPhoto: previewPhoto,
    effectDepth: effectDepth,
    effectLevelPin: effectLevelPin
  };
})();
