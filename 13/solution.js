// --- Day 13: Point of Incidence ---

import fs from 'fs';

console.time();

function checkRow(grid, x, y) {
  for (let i = x, j = x + 1; i >= 0 && j < grid[y].length; --i, ++j) {
    if (grid[y][i] !== grid[y][j]) return false;
  }

  return true;
}

function checkColumn(grid, x, y) {
  for (let i = y, j = y + 1; i >= 0 && j < grid.length; i--, j++) {
    if (grid[i][x] !== grid[j][x]) return false;
  }

  return true;
}

const checkRows = (grid, x) => grid.every((_, y) => checkRow(grid, x, y));
const checkColumns = (grid, y) => grid.every((_, x) => checkColumn(grid, x, y));

const grids = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n\r\n').map(x => x.split('\r\n'));

let sum = 0;

grids.forEach(grid => {
  let found = false;

  for (let i = 0; i < grid[0].length - 1; ++i) {
    if (checkRows(grid, i)) {
      sum += (i + 1);
      found = true;
      break;
    }
  }

  if (!found) {
    for (let i = 0; i < grid.length - 1; ++i) {
      if (checkColumns(grid, i)) {
        sum += (i + 1) * 100;
        break;
      }
    }
  }
});

console.log(`part 1: ${ sum }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();


// 37585 -- high
// 35466 -- high
// 34580 -- not right
// 32780 -- not right
// 18384 -- not right
// 17564 -- low

