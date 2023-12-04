// --- Day 4: Scratchcards ---

import fs from 'fs';

console.time();

function getMatchingCount(card) {
  const tokens = card.match(new RegExp(/\d+|\|/, 'g'));

  tokens.shift();

  const indexOfBar = tokens.indexOf('|');
  const winning = tokens.slice(0, indexOfBar);
  const numbers = tokens.slice(indexOfBar + 1);

  return winning.reduce((acc, number) => { return acc + (numbers.includes(number) ? 1 : 0) }, 0);
}

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const cards = input.split('\n');
const dict = Object.fromEntries(cards.map((_, i) => [i + 1, 1]));

let totalPoints = 0;

for (let i = 1; i <= cards.length; ++i) {
  const card = cards[i - 1];
  const count = getMatchingCount(card);

  totalPoints += count > 0 ? (1 << count - 1) : 0;

  for (let j = i + 1; j <= Math.min(cards.length, i + count); ++j) {
    dict[j] += dict[i];
  }
}

const totalCards =  Object.values(dict).reduce((sum, value) => sum + value , 0);

console.log(`part 1: ${ totalPoints }`);
console.log(`part 2: ${ totalCards }`);

console.timeEnd();
