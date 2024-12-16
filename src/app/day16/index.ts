import { defineAocModule, Mtr, readLines, type Pos, posEq, cardinalCoefs as adj, posAdd, posSub, Arr } from "@/lib";

const lines: string[] = readLines("day16/input.txt");
let g = lines.map((x) => x.split(""));

type N = {
  value: Pos;
  dir: string;
  parent: N | null;
  cost: number;
};

function findPoint(ch: string): Pos {
  return Mtr.find(g, ch)!;
}

function constructPath(end: N | null, path = [] as Pos[]): Pos[] {
  return end === null ? path.reverse() : constructPath(end.parent, [...path, end.value]);
}

function next(curr: Pos, next: Pos, diff = posSub(next, curr)): string {
  return ["E", "S", "W", "N"][adj.findIndex((x) => posEq(diff, x))];
}

function calcCost(p: Pos[], s = ["E", p.length - 1] as [string, number]): number {
  return Arr.repeat(p.length - 1, s).reduce(([d, c], _, i) => ((a = next(p[i], p[i + 1])) => [a, c + (a !== d ? 1000 : 0)])(), s)[1];
}

function compute1(sp = findPoint("S"), ep = findPoint("E")): Pos[] {
  let open: N[] = [{ value: sp, parent: null, cost: 0, dir: "E" }];
  let closed: N[] = [];

  while (open.length > 0) {
    open.sort((a, b) => a.cost - b.cost);
    const q = open.shift()!;
    closed.push(q);

    if (posEq(q.value, ep)) {
      let path = constructPath(q);
      return path;
    }

    for (let child of adj.map((x) => posAdd(q.value, x))) {
      if (!Mtr.isOnGrid(g, child) || Mtr.at(g, child) === "#" || closed.some((x) => posEq(x.value, child))) {
        continue;
      }

      let nextDir = next(q.value, child);
      let cost = q.dir === nextDir ? q.cost : q.cost + 1000;

      if (!open.some((x) => posEq(x.value, child))) {
        open.push({ value: child, parent: q, cost: cost, dir: nextDir });
        continue;
      }

      let i = open.findIndex((x) => posEq(x.value, child));

      if (i !== -1 && open[i].cost > cost) {
        open[i] = { cost, dir: nextDir, parent: q, value: child };
      }
    }
  }

  return [];
}

function sol1(): number {
  return calcCost(compute1());
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 16,
  exp1: 106_512,
  exp2: 0,
  sol1,
  sol2,
});
