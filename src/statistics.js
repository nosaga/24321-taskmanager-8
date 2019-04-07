import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import flatpickr from "flatpickr";


const statInput = document.querySelector(`.statistic__period-input`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);
const tagStatsBlock = document.querySelector(`.statistic__tags-wrap`);
const colorStatsBlock = document.querySelector(`.statistic__colors-wrap`);
const startDate = moment().startOf(`isoWeek`).format(`YYYY-MM-DD`);
const endDate = moment().endOf(`isoWeek`).format(`YYYY-MM-DD`);

// sort colors/tags
export const sortTasks = (inputTasks) => {
  return inputTasks.reduce(
      (acc, {color, tags}) => {
        const {sortedByColors, sortedByTags} = acc;
        // colors
        if (sortedByColors[color]) {
          sortedByColors[color] += 1;
        } else {
          sortedByColors[color] = 1;
        }
        // tags
        tags.forEach((tag) => {
          if (sortedByTags[tag]) {
            sortedByTags[tag] += 1;
          } else {
            sortedByTags[tag] = 1;
          }
        });
        return acc;
      },
      {
        sortedByColors: {},
        sortedByTags: {},
      }
  );
};

// filter
const filterTasks = (inputTasks, start, end) => {
  return inputTasks.filter((item) => {
    return item.dueDate >= start && item.dueDate <= end;
  });
};

const updateChart = (chart, label, data)=> {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
};

export const renderCalendar = ({ColorsChart, TagsChart}, tasks) => {
  flatpickr(statInput, {
    mode: `range`,
    defaultDate: [startDate.toString(), endDate],
    dateFormat: `Y-m-d`,
    onClose: ([start, end]) => {
      const startMS = +start;
      const endMS = +end;

      filterTasks(tasks, startMS, endMS);
      sortTasks(tasks);

      const colorData = sortTasks(tasks);
      const tagData = sortTasks(tasks);

      // update chart https://www.chartjs.org/docs/latest/developers/updates.html
      for (let i = 0; i < Object.keys(colorData.sortedByColors).length; i++) {
        updateChart(ColorsChart, Object.keys(colorData.sortedByColors)[i], Object.values(colorData.sortedByColors));

        updateChart(TagsChart, Object.keys(tagData.sortedByTags)[i], Object.values(tagData.sortedByTags));
      }
    },
  });
};

// В разрезе тегов
export const tagsStatRender = (dataTags) => {
  tagStatsBlock.classList.remove(`visually-hidden`);
  return new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: Object.keys(dataTags),
      datasets: [
        {
          data: Object.values(dataTags),
          backgroundColor: [
            `#ff3cb9`,
            `#ffe125`,
            `#0c5cdd`,
            `#000000`,
            `#31b55c`,
            `#ffffff`,
            `#ff00ff`,
            `#00ffff`
          ],
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          },
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13,
        },
      },
    },
  });
};

// В разрезе цветов
export const colorStatsRender = (dataColors) => {
  colorStatsBlock.classList.remove(`visually-hidden`);
  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: { // parse sorted tasks for required format
      labels: Object.keys(dataColors),
      datasets: [
        {
          data: Object.values(dataColors),
          backgroundColor: [
            `#ff3cb9`,
            `#ffe125`,
            `#0c5cdd`,
            `#000000`,
            `#31b55c`,
          ],
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          display: false,
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          },
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15,
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`,
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13,
        },
      },
    },
  });
};
