import {filters} from './make-filter.js';
import {tasks} from "./get-task";
import Task from "./task";
import TaskEdit from "./task-edit";

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

const renderTasks = () => {
  tasks.forEach((item) => {
    const taskComponent = new Task(item);
    const editTaskComponent = new TaskEdit(item);
    tasksBoard.appendChild(taskComponent.render());
    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksBoard.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      tasksBoard.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.unEdit = () => {
      taskComponent.render();
      tasksBoard.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

  });
};

const filterLabel = document.querySelectorAll(`.filter__label`);
filterLabel.forEach((el) => {
  el.addEventListener(`click`, function () {
    tasksBoard.innerHTML = ``;
    renderTasks();
  });
});

