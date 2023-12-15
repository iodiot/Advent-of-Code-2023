// --- Day 12: Hot Springs ---

import fs from 'fs';

console.time();

function replaceChar(str, index, replacement) {
  return str.substring(0, index) + replacement + str.substring(index + 1);
}

function countArrangements(springRow, groupSizes, memo) {
  const arraysEqual = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
  const arraysPartEqual = (a, b) => a.length <= b.length && a.every((value, index) => value <= b[index]);

  const extractGroups = (row) => row.split('.').map(el => el.length).filter(n => n > 0);

  const n = springRow.indexOf('?');

  const key = springRow.slice(0, n - 1);

  if (key in memo) {
    return memo[key];
  }

  if (n === -1) {
    memo[springRow] = arraysEqual(extractGroups(springRow), groupSizes) ? 1 : 0;
    return memo[springRow];
  }

   // if (!arraysPartEqual(extractGroups(springRow.slice(0, n)), groupSizes)) {
   //   return 0;
   // }

  const count = countArrangements(replaceChar(springRow, n, '.'), groupSizes, memo)
    + countArrangements(replaceChar(springRow, n, '#'), groupSizes, memo);

  memo[key] = count;

  return memo[key];
}

let totalArrangements = 0;

fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n').forEach((line) => {
  let springRow = line.split(' ')[0];
  let groupSizes = line.match(/\d+/g).map(Number);

  springRow = Array(5).fill(springRow).join('?');
  groupSizes = Array(5).fill(groupSizes).flat();

  const memo = {};

  totalArrangements += countArrangements(springRow, groupSizes, memo);

  console.log(memo);
});

console.log(`part 1: ${ totalArrangements }`);
console.log(`part 2: ${ 0 }`);

console.timeEnd();
