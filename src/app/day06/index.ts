import { defineAocModule, readLines, cardinalCoefs as C } from "@/lib";

type Pos = [number, number];
type Dir = "N" | "E" | "S" | "W";
type Grid = string[][];

let L = readLines("day06/input.txt");
let g = L.map((l) => l.split(""));
let I = ([r, c]: Pos) => !(r < 0 || c < 0 || r >= g.length || c >= g[0].length);
let O = ([r, c]: Pos, dir: Dir) => [getDeltaForDir(dir)].every(([dr, dc]) => g[r + dr]?.[c + dc] === "#");
let getDeltaForDir = (dir: Dir) => C[[3, 0, 1, 2][DIRS.indexOf(dir)]];
let DIRS: Dir[] = ["N", "E", "S", "W"];
let getNewDir = (d: Dir) => DIRS[(DIRS.indexOf(d) + 1) % DIRS.length];
let sp = findStartPosition();

function findStartPosition(): Pos {
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (g[i][j] === "^") {
        return [i, j];
      }
    }
  }

  throw new Error("Cannot find starting position");
}

function compute(): number {
  let visited = new Map<string, Pos>();
  let [[r, c], dr, dc, i] = [sp, -1, 0, 0];
  let dir: Dir = "N";

  while (I([r, c])) {
    if (i > 6_000) {
      return -1;
    }
    i++;
    // add to visited
    visited.set(`${r}-${c}`, [r, c]);

    // is there an obstacle directly in front of us?
    if (O([r, c], dir)) {
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

function compute2(): number {
  let counter = 0;

  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[0].length; j++) {
      if (i === sp[0] && j === sp[1]) {
        continue;
      }

      // alter cell
      let prev = g[i][j];
      g[i][j] = "#";

      // call compute
      let path = compute();

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

export default defineAocModule({
  day: 6,
  exp1: 5030,
  exp2: 1928,
  sol1: compute,
  sol2: compute2,
});
