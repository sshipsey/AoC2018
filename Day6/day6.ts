import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (input: string) => {
  const coordinates = input
    .split('\r\n')
    .map(c => c.split(', ').map(Number) as [number, number]);
  console.log(coordinates);
  const allXs = coordinates.map(v => v[0]);
  const allYs = coordinates.map(v => v[1]);

  //find the left, right, top, bottom edges
  const left = Math.min(...allXs);
  const right = Math.max(...allXs);
  const top = Math.min(...allYs);
  const bottom = Math.max(...allYs);

  for (let i = 0; i < coordinates.length; i++) {
    // for each point give me the manhattan distance to all the other points
    console.log(coordinates.map(c => manhattan_distance(c, coordinates[i])));
  }
};

const part2 = (input: string) => {};

const manhattan_distance = (a: [number, number], b: [number, number]) => {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
};
(async () => {
  const input = await promisify(readFile)('Day6/sample.txt', 'utf8');
  console.log(part1(input), part2(input));
})();
