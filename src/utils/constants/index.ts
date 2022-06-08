const minIdNumber = 1;
const maxIdNumber = 731;

const randomId = (min: number, max: number) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export { minIdNumber, maxIdNumber, randomId };
