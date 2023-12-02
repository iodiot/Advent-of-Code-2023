// --- Day 2: Cube Conundrum ---

import fs from 'fs';

function computeGameId(line, part2 = false) {
  const regex = new RegExp("Game \\d+|\\d+ red|\\d+ green|\\d+ blue", 'g');
  const matches = line.match(regex);

  let id, r = 0, g = 0, b = 0;

  for (let match of matches) {
    const tokens = match.split(' ');

    if (!part2) {
      r = 0; g = 0; b = 0;
    }

    if (tokens.includes('Game')) {
      id = parseInt(tokens[1]);
    } else if (tokens.includes('red')) {
      r = Math.max(parseInt(tokens[0]), r);
    } else if (tokens.includes('green')) {
      g = Math.max(parseInt(tokens[0]), g);
    } else if (tokens.includes('blue')) {
      b = Math.max(parseInt(tokens[0]), b);
    }

    if (!part2 && (r > 12 || g > 13 || b > 14)) return 0;
  }

  return part2 ? r * g * b : id;
}

function sumGameIds(input, part2 = false) {
  return input.split('\n').reduce((acc, line) => { return acc + computeGameId(line, part2) }, 0);
}

console.time('time');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

console.log(`part 1: ${sumGameIds(input)}`);
console.log(`part 2: ${sumGameIds(input, true)}`);

console.timeEnd('time');
