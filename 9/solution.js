// --- Day 9: Mirage Maintenance ---

import fs from 'fs';

console.time();

function extrapolateValue(row, next = true) {
  let sequences = [row];

  while (!sequences.some(seq => seq.every(val => val === 0))) {
    const lastSequence = sequences[sequences.length - 1];
    const newSequence = lastSequence.slice(1).map((val, i) => val - lastSequence[i]);
    sequences.push(newSequence);
  }

  let extrapolated = 0;
  for (let i = 0; i < sequences.length; ++i) {
    extrapolated += sequences[i][next ? sequences[i].length - 1 : 0] * (next ? 1 : ((i % 2 == 0) ? 1 : -1));
  }
  return extrapolated;
}

const sumExtrapolated = (rows, next = true) => rows.reduce((acc, row) => acc + extrapolateValue(row, next), 0);

const rows = fs.readFileSync('./input.txt', 'utf8').trim()
  .split('\n').map(line => line.match(/(-?)\d+/g).map(Number));

console.log(`part 1: ${ sumExtrapolated(rows) }`);
console.log(`part 2: ${ sumExtrapolated(rows, false) }`);

console.timeEnd();

