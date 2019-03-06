export const getTask = () => ({
  title: [
    `Get better understanding of Maps and Sets`,
    `Feed birds and ducks`,
    `Grosery shopping`,
    `Swedish: new words repeat`
  ][Math.floor(Math.random() * 4)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `cinema`,
    `cooking`,
    `education`,
    `home chores`,
    `books`
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': true,
    'sa': false,
    'su': false,
  },
  color: new Set([`black`, `yellow`, `blue`, `green`, `pink`]),
  isFavourite: true,
  isDone: true
});


export const getTaskType = [`card--edit card--black`, `card--pink card--repeat`, `card--yellow card--deadline`, `card--blue`, `card--edit card--yellow card--repeat`, `card--blue`, `card--pink card-repeat`];
