const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const cardTitle = [
  `Get better understanding of Maps and Sets`,
  `Feed birds and ducks`,
  `Grosery shopping`,
  `Swedish: new words repeat`
];

export const cardColors = [`black`, `yellow`, `blue`, `green`, `pink`, `deadline`];
export const getTaskType = [`card--edit card--black`, `card--pink card--repeat`, `card--yellow card--deadline`, `card--blue`, `card--edit card--yellow card--repeat`, `card--blue`, `card--pink card-repeat`];
const boolValues = [true, false];

export const getTasks = () => ({
  title: cardTitle[getRandomNum(0, 4)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `cinema`,
    `cooking`,
    `education`,
    `home chores`,
    `books`
  ]),
  type: [`edit`, `repeat`],
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': boolValues[getRandomNum(0, 2)],
    'tu': boolValues[getRandomNum(0, 2)],
    'we': boolValues[getRandomNum(0, 2)],
    'th': boolValues[getRandomNum(0, 2)],
    'fr': boolValues[getRandomNum(0, 2)],
    'sa': boolValues[getRandomNum(0, 2)],
    'su': boolValues[getRandomNum(0, 2)],
  },
  color: cardColors[getRandomNum(0, 5)],
  favourite: boolValues[getRandomNum(0, 2)],
  archive: boolValues[getRandomNum(0, 2)]
});

const getTasksArray = () => {
  const tasks = [];
  for (let i = 0; i < getRandomNum(7, 15); i++) {
    tasks.push(getTasks());
  }
  return tasks;
}


export const tasks = getTasksArray();
export const isActive = (active) => active ? `checked` : ``;
export const isDisabled = (disable) => disable ? `card__btn--disabled` : ``;

