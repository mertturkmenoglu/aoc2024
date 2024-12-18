import { defineAocModule, Mtr, nums, posEq, readLines, type Pos, cardinalCoefs as adj, posAdd, type BfsNode } from "@/lib";

let [bytes, g] = [readLines("day18/input.txt").map((x) => nums(x).toReversed() as Pos), Mtr.createMtr([71, 71], ".")];

type N = BfsNode<Pos>;

function constructPath(end: N | null, path = [] as Pos[]): Pos[] {
  return end === null ? path.reverse() : constructPath(end.parent, [...path, end.value]);
}

function bfs(): Pos[] {
  let open: N[] = [{ value: [0, 0], parent: null }];
  let closed: N[] = [];

  while (open.length > 0) {
    const q = open.shift()!;
    closed.push(q);

    if (posEq(q.value, [70, 70])) {
      let path = constructPath(q);
      return path;
    }

    for (let child of adj.map((x) => posAdd(q.value, x))) {
      if (
        !Mtr.isOnGrid(g, child) ||
        Mtr.at(g, child) === "#" ||
        closed.some((x) => posEq(x.value, child)) ||
        open.some((x) => posEq(x.value, child))
      ) {
        continue;
      }

      open.push({ parent: q, value: child });
    }
  }

  return [];
}

let fill = (n: number) => {
  g = Mtr.createMtr([71, 71], ".");
  for (let i = 0; i < n; i++) {
    Mtr.set(g, bytes[i], "#");
  }
};

function sol1(): number {
  fill(1024);
  return bfs().length - 1;
}

function sol2(): string {
  fill(2024);
  let [lo, hi] = [0, bytes.length];

  while (lo < hi) {
    let m = Math.floor(lo + (hi - lo) / 2);
    fill(m);
    let path = bfs();

    if (path.length === 0) {
      hi = m;
    } else {
      lo = m + 1;
    }
  }

  let i = lo - 1;
  return `${bytes[i][1]},${bytes[i][0]}`;
}

export default defineAocModule({
  day: 18,
  exp1: 320,
  exp2: "34,40",
  sol1,
  sol2,
});
