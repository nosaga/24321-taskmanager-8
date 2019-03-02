import makeFilter from './make-filter.js';
import makeTask from './make-task.js';

const filters = document.querySelector(`.main__filter`);
const tasksBoard = document.querySelector(`.board__tasks`);
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

filters.insertAdjacentHTML(`beforeend`, makeFilter(`All`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Overdue`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Today`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Favorites`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Repeating`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Tags`, getRandomNum(1, 10)));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`Archive`, getRandomNum(1, 10)));

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


