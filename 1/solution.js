// --- Day 1: Trebuchet?! ---

import fs from 'fs';

console.time('time');

function calibrationSum(lines, part2 = false) {
  const dict= {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
  };

  const maxKeyLength = Math.max(...Object.keys(dict).map(key => key.length));

  let sum = 0;

  for (let line of lines) {
    let matches = [];

    for (let i = 0; i < line.length; ++i) {
      let match = line[i];

      if (match >= '0' && match <= '9') {
        matches.push(match);
        continue;
      }

      if (!part2) continue;

      for (let j = i + 1; j < line.length && j - i - 1 < maxKeyLength; ++j, match += line[j]) {
        if (match in dict) {
          matches.push(dict[match]);
          break;
        }
      }
    }

    sum += parseInt([matches[0], matches[matches.length - 1]].join(''));
  }

  return sum;
}

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

console.log(`part 1: ${calibrationSum(lines)}`);
console.log(`part 2: ${calibrationSum(lines, true)}`);

console.timeEnd('time');