import * as _ from 'lodash';
import { promisify } from 'util';
import { readFile } from 'fs';
import * as moment from 'moment';

const part1and2 = (rows: string[]) => {
  let allGuards: {
    [key: string]: moment.Duration;
  } = {};

  const regex = new RegExp(
    /\[(.*)\] (Guard|wakes|falls) (#(\d+)|asleep|up)( begins shift)?/i
  );
  const orderedRows = _.orderBy(rows, row => {
    const res = regex.exec(row);
    return res ? moment(res[1]) : moment();
  });

  let currentGuard = '';
  let lastSleepTime = moment();

  let guardsByMinutesSlept: { [key: string]: number[] } = {};

  let currentSleepMinute: number = 0;
  for (let row of orderedRows) {
    const res = regex.exec(row);
    let currentDatetime = res ? moment(res[1]) : moment();
    let isGuard = res ? res[2] : '';

    if (isGuard === 'Guard') {
      let id = res ? res[4] : '';
      if (!allGuards.hasOwnProperty(id)) allGuards[id] = moment.duration(0);
      if (!guardsByMinutesSlept.hasOwnProperty(id))
        guardsByMinutesSlept[id] = [];
      currentGuard = id;
    } else if (isGuard === 'wakes') {
      allGuards[currentGuard] = moment
        .duration(allGuards[currentGuard])
        .add(moment(currentDatetime).diff(lastSleepTime));
      const minutesToAdd = _.range(
        currentSleepMinute,
        moment(currentDatetime).minute()
      );
      guardsByMinutesSlept[currentGuard].push(...minutesToAdd);
    } else {
      lastSleepTime = moment(currentDatetime);
      currentSleepMinute = lastSleepTime.minute();
    }
  }
  let maxSleep = 0;
  let maxGuardId = 0;
  for (let guard of Object.keys(allGuards)) {
    if (moment.duration(allGuards[guard]).asMinutes() > maxSleep) {
      maxSleep = moment.duration(allGuards[guard]).asMinutes();
      maxGuardId = Number(guard);
    }
  }
  currentGuard = '';
  let sleepingMinutes: number[] = [];
  currentSleepMinute = 0;
  for (let row of orderedRows) {
    const res = regex.exec(row);
    let currentDatetime = res ? moment(res[1]) : moment();
    let isGuard = res ? res[2] : '';
    if (isGuard === 'Guard') {
      let id = res ? res[4] : '';
      currentGuard = id;
    } else if (isGuard === 'wakes' && currentGuard === maxGuardId.toString()) {
      sleepingMinutes.push(
        ..._.range(currentSleepMinute, moment(currentDatetime).minute())
      );
    } else if (currentGuard === maxGuardId.toString()) {
      console.log(`fell asleep at ${currentDatetime.format('MM/DD @ HH:mm')}`);
      if (currentGuard === maxGuardId.toString()) {
        currentSleepMinute = moment(currentDatetime).minute();
      }
    }
  }
  let maxSleepNumTimes = 0;
  let maxSleepMinute = 0;
  const mostAsleepMinutes = _.countBy(sleepingMinutes);

  for (let minute of Object.keys(mostAsleepMinutes)) {
    if (mostAsleepMinutes[minute] > maxSleepNumTimes) {
      maxSleepMinute = Number(minute);
      maxSleepNumTimes = mostAsleepMinutes[minute];
    }
  }

  console.log(`Guard ${maxGuardId} slept for ${maxSleep} minutes`);
  console.log(`His most asleep minute was ${maxSleepMinute}`);
  console.log(
    `${maxGuardId} * ${maxSleepMinute} = ${maxGuardId * maxSleepMinute}`
  );

  let topMinuteGuardId = 0;
  let topMinute = 0;
  let topMinutesSpent = 0;
  for (let guard of Object.keys(guardsByMinutesSlept)) {
    for (let minute of Object.keys(_.countBy(guardsByMinutesSlept[guard]))) {
      if (_.countBy(guardsByMinutesSlept[guard])[minute] > topMinutesSpent) {
        topMinutesSpent = _.countBy(guardsByMinutesSlept[guard])[minute];
        topMinute = Number(minute);
        topMinuteGuardId = Number(guard);
      }
    }
  }

  return `Guard ${topMinuteGuardId} was asleep at minute ${topMinute} for ${topMinutesSpent} nights\n${topMinuteGuardId} * ${topMinute} = ${topMinuteGuardId *
    topMinute}`;
};

(async () => {
  const input = (await promisify(readFile)('Day4/input.txt', 'utf8')).split(
    '\r\n'
  );
  console.log(part1and2(input));
})();
