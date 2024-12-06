import { defineAocModule, readLines, cardinalCoefs } from "@/lib";

const lines: string[] = readLines("day06/input.txt");
const grid: string[][] = lines.map((l) => l.split(""));

function findStartPosition(): [number, number] {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "^") {
        return [i, j];
      }
    }
  }

  throw new Error("Cannot find starting position");
}

type Pos = [number, number];
type Dir = "N" | "E" | "S" | "W";

function isInGrid([r, c]: Pos, g: string[][]): boolean {
  if (r < 0 || c < 0) return false;
  if (r >= g.length || c >= g[0].length) return false;
  return true;
}

function isObstacleFront([r, c]: Pos, dir: Dir, g: string[][]): boolean {
  let [dr, dc] = getDeltaForDir(dir);
  let el = g[r + dr]?.[c + dc];
  return el === "#";
}

function getDeltaForDir(dir: Dir): [number, number] {
  let cc = cardinalCoefs[0];

  if (dir === "N") {
    cc = cardinalCoefs[3];
  } else if (dir === "E") {
    cc = cardinalCoefs[0];
  } else if (dir === "S") {
    cc = cardinalCoefs[1];
  } else {
    cc = cardinalCoefs[2];
  }

  return cc;
}

function getNewDir(dir: Dir): Dir {
  switch (dir) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
    default:
      throw new Error("unreachable");
  }
}

function compute(startPos: [number, number], g: string[][]): number {
  const visited = new Map<string, Pos>();
  let [r, c] = startPos;
  let dr = -1;
  let dc = 0;
  let dir: Dir = "N";
  let i = 0;

  while (isInGrid([r, c], g)) {
    if (i > 6_000) {
      return -1;
    }
    i++;
    // add to visited
    visited.set(`${r}-${c}`, [r, c]);

    // is there an obstacle directly in front of us?
    if (isObstacleFront([r, c], dir, g)) {
      dir = getNewDir(dir);
      let delta = getDeltaForDir(dir);
      dr = delta[0];
      dc = delta[1];
      continue;
    }

    r += dr;
    c += dc;
  }

  return visited.size;
}

function compute2([r, c]: Pos, g: string[][]): number {
  let counter = 0;

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[0].length; j++) {
      if (i === r && c === j) {
        continue;
      }

      // alter cell
      let prev = g[i][j];
      g[i][j] = "#";

      // call compute
      let path = compute([r, c], g);

      // is in loop
      if (path === -1) {
        counter++;
      }

      // revert cell change
      g[i][j] = prev;
    }
  }

  return counter;
}

function sol1(): number {
  const sp = findStartPosition();
  const res = compute(sp, grid);
  return res;
}

function sol2(): number {
  const sp = findStartPosition();
  const res = compute2(sp, grid);
  return res;
}

export default defineAocModule({
  day: 6,
  exp1: 5030,
  exp2: 1928,
  sol1,
  sol2,
});
