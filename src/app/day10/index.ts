import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posEq, posAdd, sum, type BfsNode } from "@/lib";

const lines: string[] = readLines("day10/input.txt");
const g = lines.map((l) => l.split("").map(Number));
const Key = JSON.stringify;

function construct(q: BfsNode<Pos>): string {
  let path: Pos[] = [];
  let curr = q;

  while (curr.parent !== null) {
    path.push(curr.value);
    curr = curr.parent;
  }

  return Key(path);
}

function calc2([i, j]: Pos, sol2 = false): number {
  const paths = new Set<string>();
  let open: BfsNode<Pos>[] = [{ value: [i, j], parent: null }];
  let closed: BfsNode<Pos>[] = [];

  while (open.length > 0) {
    const q = open.pop()!;
    const currValue = Mtr.$at(g, q.value);
    closed.push(q);

    if (currValue === 9) {
      paths.add(construct(q));
      continue;
    }

    if (currValue === undefined) {
      continue;
    }

    const children = adj.map((a) => posAdd(q.value, a));

    for (const child of children) {
      if (!sol2) {
        if (closed.some((x) => posEq(child, x.value))) {
          continue;
        }
      }

      if (open.some((x) => posEq(child, x.value))) {
        continue;
      }

      if (currValue + 1 !== Mtr.$at(g, child)) {
        continue;
      }

      open.push({ value: child, parent: q });
    }
  }

  return paths.size;
}

function compute(sol2 = false): number {
  return sum(Mtr.mapCell(g, (_, i, j) => (g[i][j] === 0 ? calc2([i, j], sol2) : 0)));
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
  exp2: 1058,
  sol1,
  sol2,
});
