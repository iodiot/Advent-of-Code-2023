// --- Day 11: Cosmic Expansion ---

import fs from 'fs';

console.time();

function rotate(image) {
  const rows = image.length, cols = image[0].length;
  const rotated = new Array(cols).fill(0).map(() => new Array(rows));

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      rotated[j][rows - 1 - i] = image[i][j];
    }
  }

  return rotated.map(row => row.join(''));
}

function getGalaxies(image) {
  const galaxies = [];
  image.forEach((row, y) => row.split('').forEach((ch, x) => ch === '#' && galaxies.push([x, y])));
  return galaxies;
}

function sumLengths(image, expansionFactor) {
  const emptySpace = '.'.repeat(image[0].length);
  const emptyRows = image.map((row, index) => row === emptySpace ? index : -1).filter(index => index !== -1);
  const emptyColumns = rotate(image).map((row, index) => row === emptySpace ? index : -1).filter(index => index !== -1);

  const galaxies = getGalaxies(image);

  let sum = 0;

  for (let i = 0; i < galaxies.length; ++i) {
    for (let j = i + 1; j < galaxies.length; ++j) {
      const [x0, y0] = galaxies[i], [x1, y1] = galaxies[j];
      const rows = emptyRows.filter(r => r > Math.min(y0, y1) && r < Math.max(y0, y1)).length;
      const columns = emptyColumns.filter(c => c > Math.min(x0, x1) && c < Math.max(x0, x1)).length;
      sum += Math.abs(x0 - x1) + Math.abs(y0 - y1) + (rows + columns) * (expansionFactor - 1);
    }
  }

  return sum;
}

const image = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n');

console.log(`part 1: ${ sumLengths(image, 2) }`);
console.log(`part 2: ${ sumLengths(image, 1000000) }`);

console.timeEnd();
