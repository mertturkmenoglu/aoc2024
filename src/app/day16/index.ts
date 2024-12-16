import { defineAocModule, Mtr, readLines, type Pos, posEq, cardinalCoefs, posAdd, posSub } from "@/lib";

const lines: string[] = readLines("day16/input.txt");
let g = lines.map((x) => x.split(""));

type N = {
  value: Pos;
  dir: string;
  parent: N | null;
  cost: number;
};

function findPoint(ch: string): Pos {
  let [r, c] = Mtr.dims(g);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (Mtr.at(g, [i, j]) === ch) {
        return [i, j];
      }
    }
  }
  throw new Error("not found");
}

function constructPath(end: N): Pos[] {
  let path: Pos[] = [];
  let tmp: N | null = end;

  while (tmp !== null) {
    path.push(tmp.value);
    tmp = tmp.parent;
  }

  return path.reverse();
}

function calcNextDir(curr: Pos, next: Pos): string {
  let diff = posSub(next, curr);

  if (posEq(diff, [-1, 0])) {
    return "N";
  }

  if (posEq(diff, [0, 1])) {
    return "E";
  }

  if (posEq(diff, [1, 0])) {
    return "S";
  }

  if (posEq(diff, [0, -1])) {
    return "W";
  }

  throw new Error("unknown turn");
}

function calcCost(path: Pos[]): number {
  let dir = "E";
  let cost = path.length - 1;
  let turn = 0;

  for (let i = 0; i < path.length - 1; i++) {
    let nextDir = calcNextDir(path[i], path[i + 1]);

    if (dir !== nextDir) {
      turn++;
      dir = nextDir;
      cost += 1000;
    }
  }

  console.log({ step: path.length - 1, turn });

  return cost;
}

function compute1(): number {
  let startPoint = findPoint("S");
  let endPoint = findPoint("E");
  let open: N[] = [{ value: startPoint, parent: null, cost: 0, dir: "E" }];
  let closed: N[] = [];

  while (open.length > 0) {
    open.sort((a, b) => a.cost - b.cost);
    const q = open.shift()!;
    closed.push(q);

    if (posEq(q.value, endPoint)) {
      let path = constructPath(q);
      return calcCost(path);
    }

    let children: Pos[] = cardinalCoefs.map((x) => posAdd(q.value, x));

    for (let child of children) {
      if (!Mtr.isOnGrid(g, child)) {
        continue;
      }

      if (Mtr.at(g, child) === "#") {
        continue;
      }

      if (closed.some((x) => posEq(x.value, child))) {
        continue;
      }

      let nextDir = calcNextDir(q.value, child);
      let cost = q.dir === nextDir ? q.cost : q.cost + 1000;

      if (!open.some((x) => posEq(x.value, child))) {
        open.push({ value: child, parent: q, cost: cost, dir: nextDir });
        continue;
      }

      let index = open.findIndex((x) => posEq(x.value, child));

      if (index !== -1 && open[index].cost > cost) {
        open[index] = { cost, dir: nextDir, parent: q, value: child };
      }
    }
  } 

  return -1;
}

function sol1(): number {
  return compute1();
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 16,
  exp1: 0,
  exp2: 0,
  sol1,
  sol2,
});
