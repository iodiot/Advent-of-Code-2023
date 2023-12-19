// --- Day 19: Aplenty ---

import fs from 'fs';

console.time();

function parseInput(input) {
  const blocks = input.trim().split('\r\n\r\n');

  const rules = {};

  blocks[0].split('\r\n').forEach(rule => {
    const name = rule.split('{')[0];
    const tokens = rule.slice(0, rule.length - 1).split('{')[1].split(',');

    rules[name] = tokens;
  });

  const parts = [];

  blocks[1].split('\r\n').forEach(part => {
    const descr = {};

    part.slice(1, part.length - 1).split(',').forEach(eq => {
      descr[eq.split('=')[0]] = parseInt(eq.split('=')[1]);
    });

    parts.push(descr);
  });

  return [rules, parts];
}

function checkRule(rule, part) {
  const matches = rule.match(/([xmas])(<|>)(\d+):([A-Z|a-z]+)/);

  if (!matches) return rule;

  const [, a, b, c, d] = matches;

  return b === '<'
    ? (part[a] < parseInt(c) ? d : false)
    : (part[a] > parseInt(c) ? d : false);
}

function process(rules, part, name = 'in') {
  while (true) {
    const i = rules[name].findIndex(rule => checkRule(rule, part) !== false);
    name = checkRule(rules[name][i], part);

    if (name === 'A') {
      return Object.values(part).reduce((a, b) => a + b, 0);
    } else if (name === 'R') {
      return 0;
    }
  }
}

function process2(rules, parts) {

  return 0;
}

const [rules, parts] = parseInput(fs.readFileSync('./input.txt', 'utf8'));

console.log(`part 1: ${ parts.reduce((sum, part) => sum + process(rules, part), 0) }`);
console.log(`part 2: ${ process2(rules, {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]}) }`);

console.timeEnd();
