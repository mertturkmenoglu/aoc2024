import { defineAocModule, readLines, cardinalCoefs as C } from "@/lib";

type Pos = [number, number];
type Dir = "N" | "E" | "S" | "W";
type Grid = string[][];

let L = readLines("day06/input.txt");
let g = L.map((l) => l.split(""));
let [N] = [L.length];
let I = ([r, c]: Pos) => !(r < 0 || c < 0 || r >= N || c >= N);
let O = ([r, c]: Pos, dir: Dir, G: Grid) => [GD(dir)].every(([dr, dc]) => G[r + dr]?.[c + dc] === "#");
let GD = (dir: Dir) => C[[3, 0, 1, 2][DIRS.indexOf(dir)]];
let DIRS: Dir[] = ["N", "E", "S", "W"];
let ND = (d: Dir) => DIRS[(DIRS.indexOf(d) + 1) % 4];
let A = () => [...new Array(N).keys()];
let sr = g.findIndex((r) => r.includes("^"));
let sp = [sr, g[sr].indexOf("^")];
let S = JSON.stringify;
let c = ([i, j]: Pos) => (S([i, j]) !== S(sp) ? compute([...g.map((x, ii) => x.map((h, jj) => (ii === i && jj === j ? "#" : h)))]) : -2);

let compute = (G: Grid) => {
  let [[r, c], dr, dc, i, dir, v] = [sp, -1, 0, 0, "N" as Dir, new Map<string, Pos>()];
  while (I([r, c])) {
    if (i++ > 6_000) return -1;
    v.set(S([r, c]), [r, c]);
    if (O([r, c], dir, G)) {
      [dir, dr, dc] = [ND(dir), GD(ND(dir))[0], GD(ND(dir))[1]];
    } else {
      [r, c] = [r + dr, c + dc];
    }
  }
  return v.size;
};

export default defineAocModule({
  day: 6,
  exp1: 5030,
  exp2: 1928,
  sol1: () => compute(g),
  sol2: () => A().reduce((acc, i) => acc + A().filter((j) => c([i, j]) === -1).length, 0),
});
