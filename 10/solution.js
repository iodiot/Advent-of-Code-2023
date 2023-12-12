// --- Day 10: Pipe Maze ---

import fs from 'fs';

console.time();

function traverse(grid, x, y) {
  const chToDirs = {
    '.': [],
    '|': ['n', 's'],
    '-': ['e', 'w'],
    'L': ['n', 'e'],
    'J': ['n', 'w'],
    '7': ['s', 'w'],
    'F': ['s', 'e'],
    'S': ['n', 's', 'e', 'w'],
  };

  const dirToCoords = {
    'n': [0, -1],
    'e': [+1, 0],
    'w': [-1, 0],
    's': [0, +1],
  };

  const dirToBackDir = {
    'n': 's',
    'e': 'w',
    'w': 'e',
    's': 'n',
  };

  const size = grid.length;
  const queue = [[x, y, 0]];
  const points = {};

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();
    const ch = grid[y][x];

    if (!([x, y] in points)) {
      points[[x, y]] = steps;
    }

    if (points[[x, y]] < steps) continue;

    for (const dir of chToDirs[ch]) {
      const [dx, dy] = dirToCoords[dir];
      const xx = x + dx, yy = y + dy;

      if (xx < 0 || xx >= size || yy < 0 || yy >= size) continue;

      const nextCh = grid[yy][xx];
      const backDir = dirToBackDir[dir];

      if (chToDirs[nextCh].includes(backDir))
        queue.push([xx, yy, steps + 1]);
      }
  }

  return Math.max(...Object.values(points));
}

const grid = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const y = Math.max(...grid.map((row, index) => row.indexOf('S') > -1 ? index : 0));
const x = grid[y].indexOf('S');

console.log(`part 1: ${ traverse(grid, x, y) }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();
