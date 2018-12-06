import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (input: string) => {};

const part2 = (input: string) => {};

(async () => {
  const input = await promisify(readFile)('DayX/input.txt', 'utf8');
  console.log(part1(input), part2(input));
})();
