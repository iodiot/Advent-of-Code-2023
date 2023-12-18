// --- Day 16: The Floor Will Be Lava ---

import fs from 'fs';

console.time();

function countEnergizedTiles(grid, startX, startY, startDx, startDy) {
  const get = (x, y) => grid[y] && grid[y][x] || ' ';

  const beams = [[startX, startY, startDx, startDy]];
  const visits = {};

  while (beams.length > 0) {
    let [x, y, dx, dy] = beams.shift();

    const key = `${x},${y}`;

    if ('./\\|-'.includes(get(x, y))) {
      visits[key] = (key in visits) ? visits[key] + 1 : 1;

      if (visits[key] > 5) {
        continue;
      }
    }

    x += dx;
    y += dy;

    switch (get(x, y)) {
      case ' ':
        break;
      case '.':
        beams.push([x, y, dx, dy]);
        break;
      case '|':
        if (dx !== 0) {
          beams.push([x, y, 0, +1]);
          beams.push([x, y, 0, -1]);
        } else {
          beams.push([x, y, dx, dy]);
        }
        break;
      case '-':
        if (dy !== 0) {
          beams.push([x, y, +1, 0]);
          beams.push([x, y, -1, 0]);
        } else {
          beams.push([x, y, dx, dy]);
        }
        break;
      case '/':
        beams.push([x, y, -dy, -dx]);
        break;
      case '\\':
        beams.push([x, y, dy, dx]);
        break;
    }
  }

  return Object.values(visits).filter(v => v > 0).length;
}

function countMaxEnergizedTiles(grid) {
  const entries = [];

  for (let i = 0; i < grid.length; ++i) {
    entries.push([-1, i, +1, 0]);
    entries.push([i, -1, 0, +1]);
    entries.push([grid.length, i, -1, 0]);
    entries.push([i, grid.length, 0, -1]);
  }

  return Math.max(...entries.map(e => countEnergizedTiles(grid, ...e)));
}

const grid = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n');

console.log(`part 1: ${ countEnergizedTiles(grid, -1, 0, +1, 0) }`);
console.log(`part 2: ${ countMaxEnergizedTiles(grid) }`);

console.timeEnd();
