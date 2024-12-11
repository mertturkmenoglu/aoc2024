import { Arr, defineAocModule, readLines, sum, type Pos } from "@/lib";

let [L, R, M] = [readLines("day11/input.txt")[0].split(" ").map(Number), Arr.range, () => new Map<number, number>()];
let c = new Map<number, number>(L.map((n) => [n, 1] as Pos));
let N = (n: number, l = `${n}`.length, m = l / 2) => (n === 0 ? [1] : l % 2 === 0 ? [+`${n}`.slice(0, m), +`${n}`.slice(m)] : [n * 2024]);
let B = (numbers: number[]) => numbers.flatMap((n) => N(n));
let C = (g: Map<number, number>, r = M()) => [...g.entries()].map(([s, a]) => N(s).forEach((n) => r.set(n, (r.get(n) ?? 0) + a))) && r;
let V = R(0, 75).reduce((acc) => C(acc), c);

export default defineAocModule({
  day: 11,
  exp1: 186_996,
  exp2: 221_683_913_164_898,
  sol1: () => R(0, 25).reduce((acc) => B(acc), [...L]).length,
  sol2: () => sum([...V.values()]),
});
