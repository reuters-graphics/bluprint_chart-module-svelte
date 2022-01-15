import { writable } from 'svelte/store';

const random = (skew = 1) => {
  const min = 0;
  const max = 1;
  let u = 0; let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = random(skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
};

const getRandomInt = (min = 0, max = 100, randomizer) => Math.floor(randomizer() * max) + min;

const defaultSchema = { x: [0, 100, Math.random], y: [0, 100, random], r: [10, 30, Math.random] };
const defaultLength = 10;

const fakeSomeData = (n = 10, schema = {}) => {
  return Array.from(Array(n).keys()).map(() => {
    const datum = {};
    Object.keys(schema).forEach((prop) => {
      const [min, max, randomizer] = schema[prop];
      datum[prop] = getRandomInt(min, max, randomizer);
    });
    return datum;
  });
};

export default function createFakeData() {
  const { subscribe, set } = writable(fakeSomeData(defaultLength, defaultSchema));

  return {
    subscribe,
    reset: (length = defaultLength, schema = defaultSchema) => set(fakeSomeData(length, schema)),
  };
}
