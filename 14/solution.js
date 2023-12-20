// --- Day 14: Parabolic Reflector Dish ---

import fs from 'fs';

console.time();

function tilt(platform, dx = 0, dy = -1) {
  const get = (x, y) => platform[y] && platform[y][x] || ' ';
  const set = (x, y, v) => platform[y][x] = v;
  const roll = (x, y) => {
    if (get(x, y) !== 'O') return;

    let xx = x + dx;
    let yy = y + dy;

    while (get(xx, yy) === '.') {
      set(xx, yy, 'O');
      set(xx - dx, yy - dy, '.');
      xx += dx;
      yy += dy;
    }
  };

  if (dx !== 0) {
    let [startX, endX, stepX] = dx < 0 ? [0, platform.length, 1] : [platform.length - 1, -1, -1];
    let [startY, endY, stepY] = [0, platform.length, 1];

    for (let x = startX; dx < 0 ? x < endX : x > endX; x += stepX) {
      for (let y = startY; y < endY; y += stepY) {
        roll(x, y);
      }
    }
  }

  if (dy !== 0) {
    let [startX, endX, stepX] = [0, platform.length, 1];
    let [startY, endY, stepY] = dy < 0 ? [0, platform.length, 1] : [platform.length - 1, -1, -1];

    for (let y = startY; dy < 0 ? y < endY : y > endY; y += stepY) {
      for (let x = startX; x < endX; x += stepX) {
        roll(x, y);
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

function cycleTiltAndCountLoad(platform, cycles) {
  const dirs = [[0, -1], [-1, 0], [0, +1], [+1, 0]];

  let history = [];
  let startCycle = -1;

  while (true) {
    dirs.forEach(([dx, dy]) => tilt(platform, dx, dy));

    const load = countLoad(platform);

    if (history.includes(load)) {
      if (startCycle === -1) {
        startCycle = history.length;
        history = [load];
      } else {
        break;
      }
    }

    history.push(load);
  }

  return history[(cycles - startCycle) % history.length];
}

const platform = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n')
  .map(row => row.split(''));

console.log(`part 1: ${ countLoad(tilt(Array.from(platform))) }`);
console.log(`part 2: ${ cycleTiltAndCountLoad(Array.from(platform), 1000000000) }`);

console.timeEnd();
