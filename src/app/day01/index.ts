import { defineAocModule, readLines, sum } from "@/lib";

type T = [number, number];
type V = [number[], number[]];

let [lines, P] = [readLines("day01/input.txt"), (l: string) => l.split(/\s+/).map(Number)];
let [L, p, C] = [lines.length, lines.map(P) as T[], (pl: T[]): V => [pl.map((x) => x[0]), pl.map((x) => x[1])]];
let K = C(p).map((x) => x.toSorted((a, b) => a - b));

export default defineAocModule({
  day: 1,
  exp1: 2_742_123,
  exp2: 21_328_497,
  sol1: () => sum(K[0].map((x, i) => Math.abs(x - K[1][i]))),
  sol2: () => sum(K[0].map((el, i) => el * K[1].filter((x) => el === x).length)),
});
