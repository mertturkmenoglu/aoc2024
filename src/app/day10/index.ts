import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posEq, posAdd } from "@/lib";

const lines: string[] = readLines("day10/input.txt");
const g = lines.map((l) => l.split("").map(Number));
const Key = JSON.stringify;

type BfsNode = {
  value: Pos;
  parent: BfsNode | null;
};

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

function construct(q: BfsNode): string {
  let path: Pos[] = [];
  let curr = q;

  while (curr.parent !== null) {
    // console.log(Mtr.at(g, curr.value));
    path.push(curr.value);
    curr = curr.parent;
  }

  return Key(path);
}

function calc2([i, j]: Pos): number {
  const paths = new Set<string>();
  let open: BfsNode[] = [{ value: [i, j], parent: null }];
  let closed: BfsNode[] = [];

  while (open.length > 0) {
    const q = open.pop()!;
    closed.push(q);

    if (Mtr.$at(g, q.value) === 9) {
      paths.add(construct(q));
      continue;
    }

    const children: Pos[] = [];
    for (const a of adj) {
      children.push(posAdd(q.value, a));
    }

    const currValue = Mtr.$at(g, q.value);

    if (currValue === undefined) {
      continue;
    }

    for (const child of children) {
      if (open.some((x) => posEq(child, x.value))) {
        continue;
      }

      const childValue = Mtr.$at(g, child);
      if (currValue + 1 !== childValue) {
        continue;
      }

      open.push({ value: child, parent: q });
    }
  }

  return paths.size;
}

function compute(sol2 = false): number {
  const [r, c] = Mtr.dims(g);
  let sum = 0;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (g[i][j] === 0) {
        let a = sol2 ? calc2 : calculateScore;
        sum += a([i, j]);
      }
    }
  }

  return sum;
}

function sol1(): number {
  return compute();
}

function sol2(): number {
  return compute(true);
}

export default defineAocModule({
  day: 10,
  exp1: 510,
  exp2: 0,
  sol1,
  sol2,
});
