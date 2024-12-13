import { Arr, defineAocModule, readLines, type Pos, sum } from "@/lib";

type M = [Pos, Pos, Pos];

let [L, O, F] = [readLines("day13/input.txt"), 10_000_000_000_000, Math.floor];
let P = () => Arr.range(0, L.length, 4).map((i) => L.slice(i, i + 3).map((l) => [...l.matchAll(/\d+/g)].map((x) => +x[0])) as M);
let A = ([[X, x], [Y, y], [Z, z]]: M, [a, b]: Pos) => (X * a + Y * b !== Z || x * a + y * b !== z ? 0 : 3 * a + b);
let C = (m: M, [[X, x], [Y, y], [Z, z]] = m, b = F((z * X - Z * x) / (y * X - Y * x)), a = F((Z - b * Y) / X)) => A(m, [a, b]);

export default defineAocModule({
  day: 13,
  exp1: 26299,
  exp2: 107_824_497_933_339,
  sol1: () => sum(P().map((m) => C(m))),
  sol2: () => sum(P().map(([x, y, z]) => C([x, y, [z[0] + O, z[1] + O]]))),
});
