'use strict';

(function () {
  var imageFilters = document.querySelector('.img-filters');
  var filterBtnPopular = document.querySelector('#filter-popular');
  var filterBtnNew = document.querySelector('#filter-new');
  var filterBtnDiscussed = document.querySelector('#filter-discussed');
  var btnActives = 'img-filters__button--active';

  var filterBtns = [filterBtnPopular, filterBtnNew, filterBtnDiscussed];

  var DEBOUNCE_TIME = 500;

  var FILTER_NEW_PICTURE_COUNT = 10;

  var showFilterMenu = function () {
    imageFilters.classList.remove('img-filters--inactive');
  };

  showFilterMenu(); // Показывает меню фильтров

  var addBtnClassActives = function (element) {
    element.classList.add(btnActives);
  };

  var removeBtnClassActives = function () {
    filterBtns.forEach(function (filter) {
      filter.classList.remove(btnActives);
    });
  };

  var filterPopular = function () { // фильтрация популярных фото
    return window.data.arrayPicturesDefault.slice();
  };

  var filterNew = function () {

    var tempPictures = window.data.arrayPicturesDefault.slice();
    var arrayFiltersNews = [];

    for (var i = 0; i < FILTER_NEW_PICTURE_COUNT; i++) {
      var index = window.data.getRandomInRange(0, tempPictures.length);
      arrayFiltersNews.push(tempPictures[index]);
      tempPictures.splice(index, 1);
    }
    return arrayFiltersNews;
  };

  var filterDiscussed = function () {
    return window.data.arrayPicturesDefault.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var removePictures = function () {

    var pictureElements = window.preview.picturesContainer.querySelectorAll('.picture');

    pictureElements.forEach(function (elem) {
      window.preview.picturesContainer.removeChild(elem);
    });
  };

  var debounceTimer;

  var debounceFilter = function (callback) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(callback, DEBOUNCE_TIME);
  };

  var filterPictures = function (currentButton, filterFunction) {
    removeBtnClassActives();
    addBtnClassActives(currentButton);

    debounceFilter(function () {
      removePictures();
      var newPictures = filterFunction(window.data.arrayPicturesDefault);
      window.data.pictures = newPictures;
      window.gallery.createPictures(newPictures);
    });
  };

  var onFilterPopularClick = function () {
    filterPictures(filterBtnPopular, filterPopular);
  };

  var onFilterNewClick = function () {
    filterPictures(filterBtnNew, filterNew);
  };

  var onFilterDiscussed = function () {
    filterPictures(filterBtnDiscussed, filterDiscussed);
  };

  filterBtnPopular.addEventListener('click', onFilterPopularClick);
  filterBtnNew.addEventListener('click', onFilterNewClick);
  filterBtnDiscussed.addEventListener('click', onFilterDiscussed);
})();
