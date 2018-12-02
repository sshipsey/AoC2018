import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (input: string[]) =>
  _.reduce(
    _.map(
      _.zip(
        ..._.map(input, pass => [
          Object.values(_.countBy(pass.split(''))).indexOf(2) > -1 ? 1 : 0,
          Object.values(_.countBy(pass.split(''))).indexOf(3) > -1 ? 1 : 0,
        ])
      ),
      _.sum
    ),
    (a, b) => a * b
  );

const part2 = (input: string[]) => {
  let diffs = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (j === i) continue;
      diffs = 0;
      for (let k = 0; k < input[j].length; k++) {
        if (input[i][k] !== input[j][k]) {
          diffs += 1;
        }
      }
      if (diffs === 1) {
        return `${input[i]}, ${input[j]}`;
      }
    }
  }
};

(async () => {
  const input = (await promisify(readFile)('Day2/input.txt', 'utf8')).split(
    '\r\n'
  );
  console.log(part1(input), part2(input));
})();
