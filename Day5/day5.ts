import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (reaction: string) => {
  let idx = 1;
  while (idx < reaction.length) {
    const currentChar = reaction[idx];
    const previousChar = reaction[idx - 1];
    if (reacts(currentChar, previousChar)) {
      reaction = reaction
        .slice(0, idx - 1)
        .concat(reaction.slice(idx + 1, reaction.length));
      idx = 1;
    } else {
      idx += 1;
    }
  }
  return reaction.length;
};

const part2 = (reaction: string) => {
  let minLen = Infinity;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let char of alphabet) {
    const newPolymer = reaction
      .split(char)
      .join('')
      .split(char.toUpperCase())
      .join('');
    minLen = Math.min(part1(newPolymer), minLen);
  }
  return minLen;
};
const reacts = (a: string, b: string) =>
  Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32;

(async () => {
  const input = await promisify(readFile)('Day5/input.txt', 'utf8');
  console.log(part1(input), part2(input));
})();
