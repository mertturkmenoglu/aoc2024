import { defineAocModule, readLines, sum, type Pos } from "@/lib";

type V = [number[], number[]];

let [L, P] = [readLines("day01/input.txt"), (l: string) => l.split(/\s+/).map(Number)];
let [p, C] = [L.map(P) as Pos[], (pl: Pos[]): V => [pl.map((x) => x[0]), pl.map((x) => x[1])]];
let K = C(p).map((x) => x.toSorted((a, b) => a - b));

export default defineAocModule({
  day: 1,
  exp1: 2_742_123,
  exp2: 21_328_497,
  sol1: () => sum(K[0].map((x, i) => Math.abs(x - K[1][i]))),
  sol2: () => sum(K[0].map((el) => el * K[1].filter((x) => el === x).length)),
});
