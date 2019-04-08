import {filters} from './make-filter.js';
import Filters from "./filter";
import {getTasksArray, tasks} from "./get-task";
import {hideTask} from "./get-task";
import Task from "./task";
import TaskEdit from "./task-edit";
import {sortTasks} from "./statistics";
import {renderCalendar} from "./statistics";
import {colorStatsRender} from "./statistics";
import {tagsStatRender} from "./statistics";
import moment from "moment";
export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const mainFilter = document.querySelector(`.main__filter`);
const tasksBoard = document.querySelector(`.board__tasks`);
const filtersAll = document.querySelector(`.filter`);
const chartSelector = document.querySelector(`#control__statistic`);
const statisticsSelector = document.querySelector(`.statistic`);
const boardSelector = document.querySelector(`.board.container`);

const showStats = () => {
  boardSelector.classList.add(`visually-hidden`);
  statisticsSelector.classList.remove(`visually-hidden`);
  // TODO: filter tasks

  // sort tasks
  const sortedAll = sortTasks(tasks);

  // pass sortedTasks (colors and tags)
  const ColorsChart = colorStatsRender(sortedAll.sortedByColors);
  const TagsChart = tagsStatRender(sortedAll.sortedByTags);
  renderCalendar({ColorsChart, TagsChart}, tasks);
};

const renderFilters = () => {
  filters.forEach((filter) => {
    const filterComponent = new Filters(filter);
    mainFilter.appendChild(filterComponent.render());
  });
};


const initialTasks = getTasksArray();


const filterTasks = (tasksAll, filterName) => {
  switch (filterName) {
    case `filter__All`:
      return tasksAll;
    case `filter__Overdue`:
      return tasksAll.filter((it) => moment(it.dueDate) < moment());

    case `filter__Today`:
      return tasksAll.filter((it) => moment(it.dueDate).format(`D MMMM`) === moment().format(`D MMMM`));

    case `filter__Favorites`:
      return tasksAll.filter((it) => it.favourite === true);

    case `filter__Repeating`:
      return tasksAll.filter((it) => [...Object.entries(it.repeatingDays)]
        .some((rec) => rec[1]));

    default:
      return tasksAll;
  }
};

const renderTasks = (tasksAll) => {
  tasksBoard.innerHTML = ``;

  for (let i = 0; i < tasksAll.length; i++) {
    const task = tasksAll[i];
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      tasksBoard.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      hideTask(tasks, task);
      editTaskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;
      task.dueTime = newObject.dueTime;

      taskComponent.update(task);
      taskComponent.render();
      tasksBoard.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.unEdit = () => {
      taskComponent.render();
      tasksBoard.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
    tasksBoard.appendChild(taskComponent.render());
  }
};

renderTasks(initialTasks);
renderFilters();

chartSelector.addEventListener(`click`, showStats);

filtersAll.onchange = (evt) => {
  const filterName = evt.target.id;
  const filteredTasks = filterTasks(initialTasks, filterName);
  renderTasks(filteredTasks);
};

