import { defineAocModule, Mtr, nums, posEq, readLines, type Pos, cardinalCoefs as adj, posAdd, type BfsNode, Arr } from "@/lib";

let [B, g] = [readLines("day18/input.txt").map((x) => nums(x).toReversed() as Pos), Mtr.createMtr([71, 71], ".")];

type N = BfsNode<Pos>;

function C(end: N | null, path = [] as Pos[]): Pos[] {
  return end === null ? path.reverse() : C(end.parent, [...path, end.value]);
}

function bfs(open = [{ value: [0, 0], parent: null }] as N[], closed = [] as N[]): Pos[] {
  while (open.length > 0) {
    let [, q] = [closed.push(open[0]), open.shift()!];

    if (posEq(q.value, [70, 70])) {
      return C(q);
    }

    for (let child of adj.map((x) => posAdd(q.value, x)).filter((x) => Mtr.isOnGrid(g, x) && Mtr.at(g, x) !== "#")) {
      if (!closed.some((x) => posEq(x.value, child)) && !open.some((x) => posEq(x.value, child))) {
        open.push({ parent: q, value: child });
      }
    }
  }

  return [];
}

let fill = (n: number) => {
  g = Mtr.createMtr([71, 71], ".");
  Arr.range(0, n).forEach((i) => Mtr.set(g, B[i], "#"));
};

function sol1(): number {
  fill(1024);
  return bfs().length - 1;
}

function sol2(lo = 0, hi = B.length): string {
  fill(2024);

  while (lo < hi) {
    let m = Math.floor(lo + (hi - lo) / 2);
    fill(m);

    if (bfs().length === 0) hi = m;
    else lo = m + 1;
  }

  return `${B[lo - 1][1]},${B[lo - 1][0]}`;
}

export default defineAocModule({
  day: 18,
  exp1: 320,
  exp2: "34,40",
  sol1,
  sol2,
});
