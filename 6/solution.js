// --- Day 6: Wait For It ---

import fs from 'fs';

console.time();

const EPS = 1e-9;
const low = (t, d) => Math.ceil((t - Math.sqrt(t * t - 4 * d)) / 2 + EPS);
const high = (t, d) => Math.floor((t + Math.sqrt(t * t - 4 * d)) / 2 - EPS);
const ways = (t, d) => high(t, d) - low(t, d) + 1;
const productOfWays = (t, d) => times.reduce((acc, t, i) => acc * ways(t, d[i]), 1);

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const [times, distances] = input.split('\n').map(line =>
  line.match(/\d+/g).map(Number)
);

console.log(`part 1: ${ productOfWays(times, distances) }`);
console.log(`part 2: ${ ways(parseInt(times.join('')), parseInt(distances.join(''))) }`);

console.timeEnd();
