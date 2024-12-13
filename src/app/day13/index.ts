import { defineAocModule, posEq, posSub, readLines, type Pos } from "@/lib";

const lines: string[] = readLines("day13/input.txt");

type Machine = {
  ButtonA: Pos;
  ButtonB: Pos;
  Prize: Pos;
};

function parse(): Machine[] {
  let machines: Machine[] = [];

  for (let i = 0; i < lines.length; i += 4) {
    let strA = lines[i];
    let strB = lines[i + 1];
    let strP = lines[i + 2];
    let re = /\d+/g;
    let rA = [...strA.matchAll(re)].map((x) => +x[0]) as Pos;
    let rB = [...strB.matchAll(re)].map((x) => +x[0]) as Pos;
    let rP = [...strP.matchAll(re)].map((x) => +x[0]) as Pos;
    machines.push({
      ButtonA: rA,
      ButtonB: rB,
      Prize: rP,
    });
  }

  return machines;
}

function compute1(machines: Machine[]): number {
  let sum = 0;

  for (let machine of machines) {
    sum += computeTokens(machine);
  }

  return sum;
}

function compute2(machines: Machine[]): number {
  let sum = 0;

  for (let machine of machines) {
    sum += computeTokens2(machine);
  }

  return sum;
}

function computeTokens({ ButtonA, ButtonB, Prize }: Machine): number {
  let candidates: Pos[] = [];
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100; j++) {
      let x = ButtonA[0] * i + ButtonB[0] * j;
      let y = ButtonA[1] * i + ButtonB[1] * j;
      if (posEq(Prize, [x, y])) {
        candidates.push([i, j]);
      }
    }
  }
  let fewest = candidates.map(([x, y]) => 3 * x + y).toSorted((a, b) => a - b)[0] ?? 0;
  return fewest;
}

function computeTokens2({ ButtonA: [x1, x2], ButtonB: [y1, y2], Prize: [z1, z2] }: Machine): number {
  z1 += 10_000_000_000_000;
  z2 += 10_000_000_000_000;
  let b = Math.floor((z2 * x1 - z1 * x2) / (y2 * x1 - y1 * x2));
  let a = Math.floor((z1 - b * y1) / x1);
  if (x1 * a + y1 * b !== z1 || x2 * a + y2 * b !== z2) {
    return 0;
  }
  return 3 * a + b;
}

function sol1(): number {
  let machines = parse();
  return compute1(machines);
}

function sol2(): number {
  let machines = parse();
  return compute2(machines);
}

export default defineAocModule({
  day: 13,
  exp1: 26299,
  exp2: 107_824_497_933_339,
  sol1,
  sol2,
});
