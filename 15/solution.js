// --- Day 15: Lens Library ---

import fs from 'fs';

console.time();

function hash(str) {
  return Array.from(str).reduce((val, char) => (val + char.charCodeAt(0)) * 17 % 256, 0);
}

function countFocusingPower(steps) {
  const boxes = new Map();

  steps.forEach(step => {
    const [labelWithOptionalFocal, focalString] = step.split('=');
    const label = labelWithOptionalFocal.replace(/\d+$/, '');
    const focal = focalString ? parseInt(focalString, 10) : -1;

    const box = hash(label);
    if (!boxes.has(box)) boxes.set(box, new Map());

    if (focal > -1) {
      boxes.get(box).set(label, focal);
    } else {
      boxes.get(box).delete(label);
    }
  });

  let power = 0;

  boxes.forEach((labels, box) => {
    let i = 1;
    labels.forEach(focal => {
      power += (parseInt(box, 10) + 1) * i * focal;
      i++;
    });
  });

  return power;
}

const steps = fs.readFileSync('./input.txt', 'utf8').trim().split(',');

const sum = steps.reduce((acc, step) => acc += hash(step), 0);

console.log(`part 1: ${ sum }`);
console.log(`part 2: ${ countFocusingPower(steps) }`);

console.timeEnd();
