// --- Day 3: Gear Ratios ---

import fs from 'fs';

console.time('time');

function isDigit(ch) {
  return ch >= '0' && ch <= '9';
}

function isAdjacentToSymbol(grid, x, y) {
  const steps = [[-1, 0], [0, -1], [0, 1], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];

  for (const step of steps) {
    const xx = x + step[0];
    const yy = y + step[1];
    if (xx < 0 || yy < 0 || yy >= grid.length || xx >= grid[0].length) continue;

    const ch = grid[yy][xx];

    if (ch !== '.' && !isDigit(ch)) {
      return true;
    }
  }

  return false;
}

function extractNumber(grid, x, y, withId = false) {
  const row = grid[y];

  let start = x, end = start;

  while (start >= 0 && isDigit(row[start])) --start;
  while (end < row.length && isDigit(row[end])) ++end;

  const number = parseInt(row.substring(start + 1, end), 10);

  return withId ? [number, `${y}-${start + 1}-${end}`] : number;
}

function computeGearRatio(grid, x, y) {
  const steps = [[-1, 0], [0, -1], [0, 1], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];

  let numbers = [], ids = [];

  for (const step of steps) {
    const xx = x + step[0];
    const yy = y + step[1];
    if (xx < 0 || yy < 0 || yy >= grid.length || xx >= grid[0].length) continue;

    const ch = grid[yy][xx];

    if (isDigit(ch)) {
      const [number, id] = extractNumber(grid, xx, yy, true);

      if (ids.includes(id)) continue;

      numbers.push(number);
      ids.push(id);
    }
  }

  return numbers.length === 2 ? numbers[0] * numbers[1] : 0;
}

const input = fs.readFileSync('./input.txt', 'utf8').trim();


const grid = input.split('\r\n');

let currentNumber = '', isAdjacent = false, partNumbersSum = 0, gearRatiosSum = 0;

for (let y = 0; y < grid.length; ++y) {
  for (let x = 0; x < grid[y].length; ++x) {
    const ch = grid[y][x];

    if (isDigit(ch)) {
      currentNumber = extractNumber(grid, x, y);

      if (isAdjacentToSymbol(grid, x, y)) {
        isAdjacent = true;
      }
    }

    if (!isDigit(ch) || x === grid[y].length - 1) {
      if (isAdjacent) {
        partNumbersSum += currentNumber;
      }

      isAdjacent = false;
    }

    if (ch === '*') {
      gearRatiosSum += computeGearRatio(grid, x, y);
    }
  }
}

console.log(`part 1: ${partNumbersSum}`);
console.log(`part 2: ${gearRatiosSum}`);

console.timeEnd('time');
