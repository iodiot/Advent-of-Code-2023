// --- Day 5: If You Give A Seed A Fertilizer ---

import fs from 'fs';

console.time();

const toArray = line => line.match(/\d+/g).map(Number);

function findLocation(almanac, start, end, row = 0) {
  const moves = almanac[row];
  const ranges = [];

  for (const move of moves) {
    const [dest, src, range] = move;

    if (start < src && start <= end) {
      const nextStart = Math.min(end, src - 1);
      ranges.push([start, nextStart]);
      start = nextStart + 1;
    }

    if (start >= src && start < src + range && start <= end) {
      const nextStart = Math.min(end, src + range - 1);
      ranges.push([start - src + dest, nextStart - src + dest]);
      start = nextStart + 1;
    }

    const isLastMove = moves.indexOf(move) === moves.length - 1;

    if (isLastMove && end >= src + range && start <= end) {
      ranges.push([start, end]);
    }
  }

  return Math.min(...ranges.map(([start, end]) =>
    row < almanac.length - 1 ? findLocation(almanac, start, end, row + 1) : start
  ));
}

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const lines = input.split('\n').map(line => line.trim()).join('|').split('||');

const seeds = toArray(lines.shift());
const rangedSeeds = Array.from({ length: seeds.length / 2 }, (_, index) => [
  seeds[index * 2],
  seeds[index * 2] + seeds[index * 2 + 1]
]);

const almanac = [];

for (const line of lines) {
  const tokens = line.split('|');
  const moves = [];

  tokens.shift();

  tokens.forEach(move => {
    moves.push(toArray(move));
  });

  almanac.push(moves.sort((a, b) => a[1] - b[1]));
}

const lowest = Math.min(...seeds.map(seed => findLocation(almanac, seed, seed)));
const rangedLowest = Math.min(...rangedSeeds.map(([start, end]) => findLocation(almanac, start, end)));

console.log(`part 1: ${ lowest }`);
console.log(`part 2: ${ rangedLowest }`);

console.timeEnd();
