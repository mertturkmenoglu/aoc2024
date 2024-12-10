import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posEq, posAdd } from "@/lib";

const lines: string[] = readLines("day10/input.txt");
const g = lines.map((l) => l.split("").map(Number));
const Key = JSON.stringify;

function calculateScore([i, j]: Pos): number {
  const nines = new Set<string>();
  let open: Pos[] = [[i, j]];
  let closed: Pos[] = [];

  while (open.length > 0) {
    const q = open.shift()!;
    closed.push(q);

    if (Mtr.$at(g, q) === 9) {
      nines.add(Key(q));
      continue;
    }

    const children: Pos[] = [];
    for (const a of adj) {
      children.push(posAdd(q, a));
    }

    const currValue = Mtr.$at(g, q);

    if (currValue === undefined) {
      continue;
    }

    for (const child of children) {
      if (closed.some((x) => posEq(child, x)) || open.some((x) => posEq(child, x))) {
        continue;
      }

      const childValue = Mtr.$at(g, child);
      if (currValue + 1 !== childValue) {
        continue;
      }

      open.push(child);
    }
  }

  return nines.size;
}

function compute(): number {
  const [r, c] = Mtr.dims(g);
  let sum = 0;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (g[i][j] === 0) {
        sum += calculateScore([i, j]);
      }
    }
  }

  return sum;
}

function sol1(): number {
  return compute();
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 10,
  exp1: 510,
  exp2: 0,
  sol1,
  sol2,
});
