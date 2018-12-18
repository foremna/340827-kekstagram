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

  var filteredPopulars = function () { // фильтрация популярных фото
    window.data.arrayPicturesDefault.slice();
    
    console.log(window.data.arrayPicturesDefault.slice())
  };

  filterBtnPopular.addEventListener('click', function () {
    removeBtnClassActives(filterBtnPopular);
    addBtnClassActives(filterBtnPopular);

    filteredPopulars();
  });

  filterBtnNew.addEventListener('click', function () {
    removeBtnClassActives(filterBtnNew);
    addBtnClassActives(filterBtnNew);
  });

  filterBtnDiscussed.addEventListener('click', function () {
    removeBtnClassActives(filterBtnDiscussed);
    addBtnClassActives(filterBtnDiscussed);
  });

  window.filter = {
    imageFilters: imageFilters
  };
})();