import {filters} from './make-filter.js';
import makeTask from './make-task.js';

const mainFilter = document.querySelector(`.main__filter`);
const tasksBoard = document.querySelector(`.board__tasks`);
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

filters.forEach((filter) => {
  let input = document.createElement(`input`);
  input.classList.add(`filter__input`, `visually-hidden`);
  input.setAttribute(`id`, `filter__` + filter.title.toLowerCase());
  input.setAttribute(`type`, `radio`);
  input.setAttribute(`name`, `filter`);
  let label = document.createElement(`label`);
  label.className = `filter__label`;
  label.setAttribute(`for`, `filter__` + filter.title.toLowerCase());
  label.innerHTML = `<span>` + filter.title + ` ` + filter.number + `</span>`;
  mainFilter.appendChild(input);
  mainFilter.appendChild(label);
});

const renderTasks = (dist, num) => {
  const tasks = new Array(7)
    .fill()
    .map(makeTask);
  dist.insertAdjacentHTML(`beforeend`, tasks.join(``), num);
};

const filterLabel = document.querySelectorAll(`.filter__label`);
filterLabel.forEach((el) => {
  el.addEventListener(`click`, function () {
    tasksBoard.innerHTML = ``;
    renderTasks(tasksBoard, getRandomNum(5, 15));
  });
});
