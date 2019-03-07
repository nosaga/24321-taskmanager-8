import {filters} from './make-filter.js';
import makeTask from './make-task.js';
import {getTask} from "./get-task";

const mainFilter = document.querySelector(`.main__filter`);
const tasksBoard = document.querySelector(`.board__tasks`);
export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

filters.forEach((filter) => {
  const input = document.createElement(`input`);
  input.classList.add(`filter__input`, `visually-hidden`);
  input.setAttribute(`id`, `filter__` + filter.title.toLowerCase());
  input.setAttribute(`type`, `radio`);
  input.setAttribute(`name`, `filter`);
  const label = document.createElement(`label`);
  label.className = `filter__label`;
  label.setAttribute(`for`, `filter__` + filter.title.toLowerCase());
  label.innerHTML = `<span>` + filter.title + ` ` + filter.number + `</span>`;
  mainFilter.appendChild(input);
  mainFilter.appendChild(label);
});

const renderTasks = (dist) => {
  dist.insertAdjacentHTML(`beforeend`, makeTask(getTask()));
};

const filterLabel = document.querySelectorAll(`.filter__label`);
filterLabel.forEach((el) => {
  el.addEventListener(`click`, function () {
    tasksBoard.innerHTML = ``;
    renderTasks(tasksBoard);
  });
});
