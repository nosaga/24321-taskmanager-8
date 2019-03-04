const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const filters = [
  {
    title: `All`,
    number: getRandomNum(1, 5)
  },
  {
    title: `Overdue`,
    number: getRandomNum(0, 10)
  },
  {
    title: `Today`,
    number: getRandomNum(1, 15)
  },
  {
    title: `Favorites`,
    number: getRandomNum(1, 17)
  },
  {
    title: `Repeating`,
    number: getRandomNum(3, 5)
  },
  {
    title: `Tags`,
    number: getRandomNum(1, 7)
  },
  {
    title: `Archive`,
    number: getRandomNum(1, 5)
  }
];

