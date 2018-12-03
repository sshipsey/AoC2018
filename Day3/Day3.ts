import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';

const part1 = (input: string[]) => {
  var regex = new RegExp(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/i);
  let maxW = 0;
  let maxH = 0;
  let coveredSquares: string[] = [];
  for (let i = 0; i < input.length; i++) {
    let res = regex.exec(input[i]);
    let id = res ? res[1] : 0;
    let left = Number(res ? res[2] : 0);
    let top = Number(res ? res[3] : 0);
    let width = Number(res ? res[4] : 0);
    let height = Number(res ? res[5] : 0);

    for (let j = left; j < left + width; j++) {
      for (let k = top; k < top + height; k++) {
        coveredSquares.push(`${j} ${k}`);
      }
    }
  }
  const squaresByCount = _.countBy(coveredSquares);

  return _.filter(Object.values(squaresByCount), v => v > 1).length;
};

const part2 = (input: string[]) => {
  var regex = new RegExp(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/i);
  let maxW = 0;
  let maxH = 0;
  let totalCoveredSquares: string[] = [];
  let totalSquaresById: { [key: number]: string[] } = {};
  for (let i = 0; i < input.length; i++) {
    let res = regex.exec(input[i]);
    let id = Number(res ? res[1] : 0);
    let left = Number(res ? res[2] : 0);
    let top = Number(res ? res[3] : 0);
    let width = Number(res ? res[4] : 0);
    let height = Number(res ? res[5] : 0);
    let squaresById: string[] = [];
    for (let j = left; j < left + width; j++) {
      for (let k = top; k < top + height; k++) {
        totalCoveredSquares.push(`${j} ${k}`);
        squaresById.push(`${j} ${k}`);
      }
    }
    totalSquaresById[id] = squaresById;
  }
  const squaresByCount = _.countBy(totalCoveredSquares);
  let safeSquares = _.filter(
    Object.keys(squaresByCount),
    v => squaresByCount[v] === 1
  );
  let correctId: string = '';
  for (let id of Object.keys(totalSquaresById)) {
    let thisid = false;
    for (let square of totalSquaresById[Number(id)]) {
      if (safeSquares.indexOf(square) === -1) {
        thisid = true;
      }
    }
    if (!thisid) return id;
    thisid = false;
  }
  return correctId;
};

(async () => {
  const input = (await promisify(readFile)('Day3/input.txt', 'utf8')).split(
    '\r\n'
  );
  console.log(part1(input), part2(input));
})();
