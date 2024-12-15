import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as card, posAdd } from "@/lib";

const lines: string[] = readLines("day15/input.txt");
let g: string[][] = [];
let ops: string[] = [];

function parseInput() {
  let [grid, opString] = lines.join("\n").split("\n\n");
  g = grid.split("\n").map((x) => x.split(""));
  ops = opString.split("");
}

function findStartPos(): Pos {
  let [r, c] = Mtr.dims(g);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (g[i][j] === "@") {
        return [i, j];
      }
    }
  }
  throw new Error("cannot find start pos");
}

function compute(startPos: Pos): number {
  let currPos: Pos = [startPos[0], startPos[1]];
  for (let op of ops) {
    currPos = doOperation(currPos, op);
  }

  let sum = 0;
  let [r, c] = Mtr.dims(g);
  let counter = 0;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (g[i][j] === "O") {
        counter++;
        sum += i * 100 + j;
      }
    }
  }

  // console.log({ counter });
  return sum;
}

function getCoef(op: string): Pos | null {
  if (op === ">") return card[0];
  if (op === "v") return card[1];
  if (op === "<") return card[2];
  if (op === "^") return card[3];
  if (op === "\n") return null;
  console.log({ op: op });
  throw new Error("invalid op");
}

function doOperation(curr: Pos, op: string): Pos {
  let coef = getCoef(op);
  if (coef === null) {
    return curr;
  }
  let frontPos = posAdd(curr, coef);
  let front = Mtr.at(g, frontPos);

  // empty space
  if (front === ".") {
    Mtr.set(g, frontPos, "@");
    Mtr.set(g, curr, ".");
    return frontPos;
  }

  // wall
  if (front === "#") {
    return curr;
  }

  // box
  let pos: Pos = [curr[0], curr[1]];
  while (Mtr.at(g, posAdd(pos, coef)) === "O") {
    pos = posAdd(pos, coef);
  }
  let nextPos = posAdd(pos, coef);

  if (Mtr.at(g, nextPos) === "#") {
    return curr;
  }

  Mtr.set(g, curr, ".");
  Mtr.set(g, posAdd(curr, coef), "@");
  Mtr.set(g, nextPos, "O");

  return posAdd(curr, coef);
}

function sol1(): number {
  parseInput();
  let startPos = findStartPos();
  let res = compute(startPos);
  // console.table(g);
  return res;
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 15,
  exp1: 1_471_826,
  exp2: 0,
  sol1,
  sol2,
});
