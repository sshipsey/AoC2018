import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (frequencies: number[]) => _.sum(frequencies);

const part2 = (frequencies: number[]) => {
  let seen: number[] = [0];
  let currentFreq = 0;

  for (let i of circularArrayIterator(frequencies.length)) {
    currentFreq += frequencies[i];
    if (seen.includes(currentFreq)) return currentFreq;
    seen.push(currentFreq);
  }
};

function* circularArrayIterator(length: number) {
  let i = 0;
  while (true) {
    yield i % length;
    i += 1;
  }
}

(async () => {
  const input = _.map(
    (await promisify(readFile)('Day1/input.txt', 'utf8')).split('\r\n'),
    Number
  );
  console.log(part1(input), part2(input));
})();
