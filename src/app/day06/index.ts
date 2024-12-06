import { defineAocModule, readLines, cardinalCoefs as C } from "@/lib";

type P = [number, number];
type R = "N" | "E" | "S" | "W";
type H = string[][];

let [L, S, D] = [readLines("day06/input.txt"), JSON.stringify, ["N", "E", "S", "W"] as R[]];
let [g, N, A] = [L.map((l) => l.split("")), L.length, () => [...new Array(N).keys()]];
let [I, GD] = [([r, c]: P) => !(r < 0 || c < 0 || r >= N || c >= N), (dir: R) => C[[3, 0, 1, 2][D.indexOf(dir)]]];
let [O, ND] = [([r, c]: P, d: R, G: H) => [GD(d)].every(([dr, dc]) => G[r + dr]?.[c + dc] === "#"), (d: R) => D[(D.indexOf(d) + 1) % 4]];
let sp = [g.findIndex((r) => r.includes("^")), g[g.findIndex((r) => r.includes("^"))].indexOf("^")];
let c = ([i, j]: P) => (S([i, j]) !== S(sp) ? compute([...g.map((x, ii) => x.map((h, jj) => (ii === i && jj === j ? "#" : h)))]) : -2);

let compute = (G: H) => {
  let [[r, c], dr, dc, i, dir, v] = [sp, -1, 0, 0, "N" as R, new Map<string, P>()];
  while (I([r, c]) && i++ < 6_000 && v.set(S([r, c]), [r, c]))
    if (O([r, c], dir, G)) [dir, dr, dc] = [ND(dir), GD(ND(dir))[0], GD(ND(dir))[1]];
    else [r, c] = [r + dr, c + dc];
  return i > 6000 ? -1 : v.size;
};

export default defineAocModule({
  day: 6,
  exp1: 5030,
  exp2: 1928,
  sol1: () => compute(g),
  sol2: () => A().reduce((acc, i) => acc + A().filter((j) => c([i, j]) === -1).length, 0),
});
