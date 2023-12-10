// --- Day 10: Pipe Maze ---

import fs from 'fs';

console.time();

function traverse(grid, x, y) {
  const pipes = {
    '.': [],
    '|': ['n', 's'],
    '-': ['e', 'w'],
    'L': ['n', 'e'],
    'J': ['n', 'w'],
    '7': ['s', 'w'],
    'F': ['s', 'e'],
    'S': ['n', 's', 'e', 'w'],
  };

  const dirs = {
    'n': [0, -1],
    'e': [+1, 0],
    'w': [-1, 0],
    's': [0, +1],
  };

  const queue = [[x, y]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const ch = grid[y][x];

    for (const [dx, dy] of dirs[pipes[ch]]) {
      const xx = xx + dx, yy = y + dy;


    }
  }
}

const grid = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const y = Math.max(...grid.map((row, index) => row.indexOf('S') > -1 ? index : 0));
const x = grid[y].indexOf('S');

console.log(x);

console.log(`part 1: ${ 0 }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();
