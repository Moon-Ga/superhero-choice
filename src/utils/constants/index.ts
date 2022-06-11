import { HeroID } from 'utils/data/HeroID.js';

const minIdNumber = 1;
const maxIdNumber = 731;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomId: any = (min: number, max: number) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);

  const randomNumber =
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  if (!HeroID.includes(randomNumber)) {
    return randomId(min, max);
  }

  return randomNumber;
};

export { minIdNumber, maxIdNumber, randomId };
