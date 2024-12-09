import { Arr, defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day09/input.txt");
const line = lines[0];

function construct(): number[] {
  let s: number[] = [];
  let id = 0;

  for (let i = 0; i < line.length; i++) {
    s.push(...Arr.repeat(+line[i], i % 2 === 0 ? id : -1));
    if (i % 2 === 0) {
      id++;
    }
  }

  return s;
}

function move(s: number[]): number[] {
  const totalDotCount = s.filter((x) => x === -1).length;
  while (!s.slice(-totalDotCount).every((x) => x === -1)) {
    let dot = s.findIndex((x) => x === -1);
    let digit = s.findLastIndex((x) => x !== -1);
    s[dot] = s[digit];
    s[digit] = -1;
  }

  return s;
}

function move2(s: number[]): Array<number[]> {
  let a = group(s);
  let i = a.length - 1;

  while (i >= 0) {
    if (a[i][0] === -1) {
      i--;
      continue;
    }

    const emptyIndex = a.findIndex((x, j) => x[0] === -1 && j < i && x.length >= a[i].length);
    if (emptyIndex === -1) {
      i--;
      continue;
    }

    const target = a[emptyIndex];
    const src = [...a[i]];
    const lenDiff = target.length - src.length;
    const newElems = [src];
    if (lenDiff > 0) {
      newElems.push(new Array(lenDiff).fill(-1));
    }
    a.splice(emptyIndex, 1, ...newElems);
    const j = a.findLastIndex((x) => x[0] === src[0]);
    for (let k = 0; k < a[j].length; k++) {
      a[j][k] = -1;
    }
    if (lenDiff === 0) {
      i--;
    }
  }

  return a;
}

function group(s: number[]): Array<number[]> {
  let newArr: Array<number[]> = [];
  let i = 0;

  while (i < s.length) {
    let j = i + 1;
    while (s[i] === s[j]) {
      j++;
    }
    newArr.push(s.slice(i, j));
    i = j;
  }

  return newArr;
}

function checksum(s: number[]): number {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === -1) continue;
    let n = +s[i];
    sum += i * n;
  }
  return sum;
}

function sol1(): number {
  const s = construct();
  const newS = move(s);
  const chksm = checksum(newS);
  return chksm;
}

function sol2(): number {
  const s = construct();
  const newS = move2(s);
  const chsm = checksum(newS.flat());
  return chsm;
}

export default defineAocModule({
  day: 9,
  exp1: 6_225_730_762_521,
  exp2: 6_250_605_700_557,
  sol1,
  sol2,
});
