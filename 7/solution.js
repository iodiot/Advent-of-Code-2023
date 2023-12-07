// --- Day 7: Camel Cards ---

import fs from 'fs';

console.time();

const handToDict = (hand) => {
  const dict = {};
  hand.split('').forEach(ch => dict[ch] = (dict[ch] || 0) + 1);
  return dict;
};

function handType(hand, withJoker = false) {
  let dict = handToDict(hand);

  if (withJoker) {
    const sorted = ((Object.entries(dict).sort(
      (a, b) => b[1] - a[1]
    )));

    if (sorted[0][0] === 'J') sorted.shift();

    const replacedBy = sorted.length > 0 ? sorted[0][0] : 'A';

    hand = hand.replace(/[J]/g, replacedBy);

    dict = handToDict(hand);
  }

  const values = Object.values(dict);
  const count = (val) => values.filter(n => n === val).length;

  switch (true) {
    case count(1) === 5:
      return 0; // High card
    case count(2) === 1 && count(1) === 3:
      return 1; // One pair
    case count(2) === 2 && count(1) === 1:
      return 2; // Two pair
    case count(3) === 1 && count(1) === 2:
      return 3; // Three of a kind
    case count(3) === 1 && count(2) === 1:
      return 4; // Full house
    case count(4) === 1 && count(1) === 1:
      return 5; // Four of a kind
    default:
      return 6; // Five of a kind
  }
}

function cardsCompare(a, b, withJoker = false) {
  const cardsOrder = withJoker ? 'J23456789TQKA' : '23456789TJQKA';

  for (let i = 0; i < 5; ++i) {
    const diff = cardsOrder.indexOf(a[i]) - cardsOrder.indexOf(b[i]);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

function handsCompare(a, b, withJoker = false) {
  const diff = handType(a, withJoker) - handType(b, withJoker);
  return diff === 0 ? cardsCompare(a, b, withJoker) : diff;
}

function computeTotalWinnings(lines, withJoker = false) {
  lines.sort((a, b) => handsCompare(a[0], b[0], withJoker));

  return lines.reduce((total, [hand, bid], index) => total + (index + 1) * parseInt(bid), 0);
}

const lines = fs
  .readFileSync('./input.txt', 'utf8').trim()
  .split('\r\n')
  .map(line => line.split(' '));

console.log(`part 1: ${ computeTotalWinnings(lines) }`);
console.log(`part 2: ${ computeTotalWinnings(lines, true) }`);

console.timeEnd();
