// --- Day 14: Parabolic Reflector Dish ---

import fs from 'fs';

console.time();

function tilt(platform) {
  const get = (x, y) => platform[y] && platform[y][x] || ' ';
  const set = (x, y, v) => platform[y][x] = v;

  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < platform[y].length; x++) {
      if (get(x, y) !== 'O') continue;

      let yy = y - 1;

      while (get(x, yy) === '.') {
        set(x, yy, 'O');
        set(x, yy + 1, '.');
        --yy;
      }
    }
  }

  return platform;
}

function countLoad(platform) {
  let load = 0;

  for (let y = 0; y < platform.length; y++) {
    load += platform[y].filter(v => v === 'O').length * (platform.length - y);
  }

  return load;
}

const platform = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n')
  .map(row => row.split(''));

console.log(`part 1: ${ countLoad(tilt(platform)) }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();
