// --- Day 8: Haunted Wasteland ---

import fs from 'fs';

console.time();

function countSteps(grid, instructions, nodes) {
  for (let i = 0; ; ++i) {
    const instruction = instructions[i % instructions.length];
    nodes = nodes.map(node => grid[node][instruction]);

    if (nodes.every(node => node[2] === 'Z')) {
      return i + 1;
    }
  }
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const lcmArray = (arr) => (arr.length === 0 ? null : arr.reduce((result, num) => lcm(result, num), arr[0]));

const input = fs.readFileSync('./input.txt', 'utf8').trim();
const lines = input.split('\r\n').filter(line => line.length > 0);
const instructions = lines.shift().split('');
const grid = {};

lines.map(line => line.match(/[0-9A-Z]{3}/g)).forEach(([a, b, c]) => {
  grid[a] = {'L': b, 'R': c};
});

const nodes = Object.keys(grid).filter(key => key[2] === 'A');
const steps = nodes.map(node => countSteps(grid, instructions, [node]));

console.log(`part 1: ${ countSteps(grid, instructions, ['AAA']) }`);
console.log(`part 2: ${ lcmArray(steps) }`);

console.timeEnd();
