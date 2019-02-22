'use strict';

const mainFilter = document.querySelector('.main__filter');
const boardTasks = document.querySelector('.board__tasks');
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;


const filters = [
  {
    title: 'All',
    number: getRandomNum(15, 20)
  },
  {
    title: 'Overdue',
    number: getRandomNum(1, 15)
  },
  {
    title: 'Today',
    number: getRandomNum(2, 15)
  },
  {
    title: 'Favorites',
    number: getRandomNum(5, 30)
  },
  {
    title: 'Repeating',
    number: getRandomNum(3, 25)
  },
  {
    title: 'Tags',
    number: getRandomNum(5, 15)
  },
  {
    title: 'Archive',
    number: getRandomNum(1, 10)
  }
];

filters.forEach((filter) => {
  console.log(filter);
  let input = document.createElement('input');
  input.classList.add('filter__input', 'visually-hidden');
  input.setAttribute('id', 'filter__' + filter.title.toLowerCase());
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'filter');
  let label = document.createElement('label');
  label.className ='filter__label';
  label.setAttribute('for', 'filter__' + filter.title.toLowerCase());
  label.innerHTML = '<span>' + filter.title + ' ' +  filter.number + '</span>';
  mainFilter.appendChild(input);
  mainFilter.appendChild(label);
});


const cardColors = ['pink', 'blue', 'black', 'yelow'];
const cardFunction = ['edit', 'repeat', 'deadline'];

const cardsRender = function (num) {
  for (let i = 0; i < num; i++) {
    const fragment = document.createDocumentFragment();
    const article = document.createElement('article');
    article.classList.add('card', 'card--' + cardColors[getRandomNum(0,4)], 'card--' + cardFunction[getRandomNum(0,3)]);
    article.innerHTML = cardTemplate;
    fragment.appendChild(article);
    boardTasks.appendChild(fragment);
  }
};

const filterLabel = document.querySelectorAll('.filter__label');
filterLabel.forEach((el) => {
  el.addEventListener('click', function () {
    boardTasks.innerHTML = '';
    cardsRender(getRandomNum(5, 15));
  });
});

const cardTemplate = `<form class="card__form" method="get">
  <div class="card__inner">
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
      edit
      </button>
      <button type="button" class="card__btn card__btn--archive">
      archive
      </button>
      <button
      type="button"
      class="card__btn card__btn--favorites card__btn--disabled"
      >
      favorites
      </button>
    </div>
    <div class="card__color-bar">
      <svg width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
    <div class="card__textarea-wrap">
      <label>
        <textarea class="card__text" placeholder="Start typing your text here..."
        name="text">
        This is example of new task, you can add picture, set date and time, add tags.</textarea>
      </label>
    </div>
  <div class="card__settings">
    <div class="card__details">
      <div class="card__dates">
        <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">no</span>
        </button>
        <fieldset class="card__date-deadline" disabled>
          <label class="card__input-deadline-wrap">
            <input
            class="card__date"
            type="text"
            placeholder="23 September"
            name="date"
            />
          </label>
          <label class="card__input-deadline-wrap">
            <input
            class="card__time"
            type="text"
            placeholder="11:15 PM"
            name="time"
            />
          </label>
        </fieldset>
        <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">no</span>
        </button>
        <fieldset class="card__repeat-days" disabled>
          <div class="card__repeat-days-inner">
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-mo-1"
            name="repeat"
            value="mo"
            />
            <label class="card__repeat-day" for="repeat-mo-1"
            >mo</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-tu-1"
            name="repeat"
            value="tu"
            checked
            />
            <label class="card__repeat-day" for="repeat-tu-1"
            >tu</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-we-1"
            name="repeat"
            value="we"
            />
            <label class="card__repeat-day" for="repeat-we-1"
            >we</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-th-1"
            name="repeat"
            value="th"
            />
            <label class="card__repeat-day" for="repeat-th-1"
            >th</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-fr-1"
            name="repeat"
            value="fr"
            checked
            />
            <label class="card__repeat-day" for="repeat-fr-1"
            >fr</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            name="repeat"
            value="sa"
            id="repeat-sa-1"
            />
            <label class="card__repeat-day" for="repeat-sa-1"
            >sa</label>
            <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-su-1"
            name="repeat"
            value="su"
            checked
            />
            <label class="card__repeat-day" for="repeat-su-1"
            >su</label>
          </div>
        </fieldset>
      </div>
      <div class="card__hashtag">
        <div class="card__hashtag-list"></div>
          <label>
            <input
            type="text"
            class="card__hashtag-input"
            name="hashtag-input"
            placeholder="Type new hashtag here"
            />
          </label>
        </div>
      </div>
      <label class="card__img-wrap card__img-wrap--empty">
        <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
        />
        <img
        src="img/add-photo.svg"
        alt="task picture"
        class="card__img"
        />
      </label>
      <div class="card__colors-inner">
        <h3 class="card__colors-title">Color</h3>
        <div class="card__colors-wrap">
          <input
          type="radio"
          id="color-black-1"
          class="card__color-input card__color-input--black visually-hidden"
          name="color"
          value="black"
          checked
          />
          <label
          for="color-black-1"
          class="card__color card__color--black"
          >black</label>
          <input
          type="radio"
          id="color-yellow-1"
          class="card__color-input card__color-input--yellow visually-hidden"
          name="color"
          value="yellow"
          />
          <label
          for="color-yellow-1"
          class="card__color card__color--yellow"
          >yellow</label>
          <input
          type="radio"
          id="color-blue-1"
          class="card__color-input card__color-input--blue visually-hidden"
          name="color"
          value="blue"
          />
          <label
          for="color-blue-1"
          class="card__color card__color--blue"
          >blue</label>
          <input
          type="radio"
          id="color-green-1"
          class="card__color-input card__color-input--green visually-hidden"
          name="color"
          value="green"
          />
          <label
          for="color-green-1"
          class="card__color card__color--green"
          >green</label>
          <input
          type="radio"
          id="color-pink-1"
          class="card__color-input card__color-input--pink visually-hidden"
          name="color"
          value="pink"
          />
          <label
          for="color-pink-1"
          class="card__color card__color--pink"
          >pink</label>
        </div>
      </div>
    </div>
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  </div>
</form>`
