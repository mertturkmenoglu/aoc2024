import { defineAocModule, Mtr, readLines, type Matrix } from "@/lib";

const lines: string[] = readLines("day25/input.txt");

type Input = {
  locks: Matrix<string>[];
  keys: Matrix<string>[];
};

function parse(): Input {
  let groups = lines.join("\n").split("\n\n");
  let inp: Input = {
    locks: [],
    keys: [],
  };

  for (let group of groups) {
    let mtr = group.split("\n").map((x) => x.split(""));
    let isLock = Mtr.row(mtr, 0).every((x) => x === "#");
    if (isLock) {
      inp.locks.push(mtr);
    } else {
      inp.keys.push(mtr);
    }
  }

  return inp;
}

function pinHeights(m: Matrix<string>): number[] {
  let heights: number[] = [];
  for (let i = 0; i < m[0].length; i++) {
    heights.push(Mtr.col(m, i).filter((x) => x === "#").length);
  }
  return heights;
}

function fit(key: Matrix<string>, lock: Matrix<string>): boolean {
  let keyHeights = pinHeights(key);
  let lockHeights = pinHeights(lock);

  for (let i = 0; i < keyHeights.length; i++) {
    let k = keyHeights[i];
    let l = lockHeights[i];

    if (k + l > 7) {
      return false;
    }
  }

  return true;
}

function comp1(inp: Input): number {
  let counter = 0;
  for (let key of inp.keys) {
    for (let lock of inp.locks) {
      if (fit(key, lock)) {
        counter++;
      }
    }
  }
  return counter;
}

function sol1(): number {
  return comp1(parse());
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 25,
  exp1: 3663,
  exp2: 0,
  sol1,
  sol2,
});
