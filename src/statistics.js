import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import flatpickr from "flatpickr";
import {getTasksArray} from "./get-task";

const statisticsSelector = document.querySelector(`.statistic`);
const boardSelector = document.querySelector(`.board.container`);
const statInput = document.querySelector(`.statistic__period-input`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
const tagStatsBlock = document.querySelector(`.statistic__tags-wrap`)
const colorStatsBlock = document.querySelector(`.statistic__colors-wrap`)
const startDate = moment().startOf(`isoWeek`);
const endDate = moment().endOf(`isoWeek`);


const renderCalendar = () => {
  flatpickr(statInput, {
    mode: `range`,
    defaultDate: [startDate, endDate],
    dateFormat: `j F`
  });
};

console.log(startDate);
console.log(endDate);
statInput.addEventListener(`onchange`, function () {console.log(startDate)});


const getRangeTasks = (start, end, task) => {
  return task.filter((item) => {
    return item.dueDate >= start && item.dueDate <= end;
  });
};

export const showStats = () => {
  boardSelector.classList.add(`visually-hidden`);
  statisticsSelector.classList.remove(`visually-hidden`);
  colorStatsRender();
  tagsStatRender();
  getCardsByColor();
  renderCalendar();
};
const colors = [`pink`, `yellow`, `black`, `blue`, `green`];

export const getCardsByColor = () => {
  const tasks = getTasksArray();
  tasks.forEach((task) => {
    console.log(task);
  });
};


// В разрезе тегов
const tagsStatRender = () => {
  tagStatsBlock.classList.remove(`visually-hidden`);
  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
      datasets: [{
        data: [20, 15, 10, 5, 2],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  return tagsChart;
}
// В разрезе цветов
const colorStatsRender = () => {
  colorStatsBlock.classList.remove(`visually-hidden`);
  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
      datasets: [{
        data: [5, 25, 15, 10, 30],
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  return colorsChart;
};
