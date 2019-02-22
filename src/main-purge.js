'use strict';

const mainFilter = document.querySelector('.main__filter');
const boardTasks = document.querySelector('.board__tasks');
const filterAll = document.getElementById('filter__all');
const filterOverdue = document.getElementById('filter__overdue');
const filterToday = document.getElementById('filter__today');
const filterFavorites = document.getElementById('filter__favorites');
const filterRepeating = document.getElementById('filter__repeating');
const filterTags = document.getElementById('filter__tags');
const filterArchive = document.querySelector('.filter__archive');

const removeElemsOnload = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

const enableCard = function () {
  let cards = getRandom(15);
  for (let i = 0; i < cards; i++) {
    boardTasks.insertAdjacentHTML(`beforeend`, getCardElem('pink', 'deadline', cardPink));
  }
};


const getRandom = (max) => Math.floor(Math.random() * max);
const filters = ['All', 'Overdue', 'Today', 'Repeating', 'Tags', 'Archive'];
const filterElems = [filterAll, filterOverdue, filterToday, filterRepeating, filterTags, filterArchive];

const insertElem = function (elemParent, placement, childElem) {
  elemParent.insertAdjacentHTML(placement, childElem);
};

//removeElemsOnload(mainFilter);
//removeElemsOnload(boardTasks);


const getFilterElem = function (caption, elem, amount, isChecked = false) {
  return `
<input type="radio"
  id = "filter__${caption.toLowerCase()}"
  name = "filter"
  class="filter__input visually-hidden"
  ${isChecked ? "checked" : ""} />
  <label for="filter__${caption.toLowerCase()}" class="filter__label">${caption} ${getRandom(50)}</label>`
};

const renderFilters = function () {
  for (let i = 0; i < filters.length; i++) {
    insertElem(mainFilter, `beforeend`, getFilterElem(filters[i], filterElems[i]));
  }
};

renderFilters();

const cardBlack = document.getElementById('card--black');
const cardPink = document.querySelector('.card--pink');
const cardDeadline = document.querySelector('.card--deadline');
const cardRepeat = document.querySelector('.card--repeat');
const cardBlue = document.querySelector('.card--blue');

const getCardElem = function (caption, captionFunc, elem) {
  return `
    <article
    class="card card--${caption} card--${captionFunc}">
      <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
                    favorites
                  </button>
                </div>
              </div>
            </form>
    </arcticle>
  `
};

filterAll.addEventListener('click',  enableCard);
