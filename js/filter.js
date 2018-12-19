'use strict';

(function () {
  var imageFilters = document.querySelector('.img-filters');
  var filterBtnPopular = document.querySelector('#filter-popular');
  var filterBtnNew = document.querySelector('#filter-new');
  var filterBtnDiscussed = document.querySelector('#filter-discussed');
  var btnActives = 'img-filters__button--active';

  var filterBtns = [filterBtnPopular, filterBtnNew, filterBtnDiscussed];
  filterBtns.forEach(function (filter) {
    filter.classList.remove(btnActives);
  });

  var addBtnClassActives = function (element) {
    element.classList.add(btnActives);
  };

  var removeBtnClassActives = function (element) {
    element.classList.remove(btnActives);
  };

  var tempPictures = window.data.arrayPicturesDefault.slice();

  var arrayFiltersNews = [];

  var filteredPopulars = function () { // фильтрация популярных фото
    return window.data.arrayPicturesDefault.slice();
  };

  var filteredNews = function () {
    for (var i = 0; i < 10; i++) {
      var index = window.data.getRandomInRange(0, tempPictures.length);
      return arrayFiltersNews.push(tempPictures.splice(index, 1));
    }
  };

  var filteredDiscussed = function () {
    var filterDiscussedSort = window.data.arrayPicturesDefault.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  filterBtnPopular.addEventListener('click', function () {
    removeBtnClassActives(filterBtnPopular);
    addBtnClassActives(filterBtnPopular);

    window.preview.pictureMin.forEach(function (elem) {
      window.preview.picturesContainer.removeChild(elem);
    });

    var someArray = filteredPopulars(window.data.arrayPicturesDefault);

    window.gallery.createPictures(someArray);
  });

  filterBtnNew.addEventListener('click', function () {
    removeBtnClassActives(filterBtnNew);
    addBtnClassActives(filterBtnNew);

    window.preview.pictureMin.forEach(function (elem) {
      window.preview.picturesContainer.removeChild(elem);
    });

    var someArray = filteredNews(window.data.arrayPicturesDefault);

    window.gallery.createPictures(someArray);
  });

  filterBtnDiscussed.addEventListener('click', function () {
    removeBtnClassActives(filterBtnDiscussed);
    addBtnClassActives(filterBtnDiscussed);

    window.preview.pictureMin.forEach(function (elem) {
      window.preview.picturesContainer.removeChild(elem);
    });

    var someArray = filteredDiscussed(window.data.arrayPicturesDefault);

    window.gallery.createPictures(someArray);
  });

  window.filter = {
    imageFilters: imageFilters
  };
})();