import { Arr, defineAocModule, readLines, type Pos } from "@/lib";

let [L, X, Y, T, xm, ym, K] = [readLines("day14/input.txt"), 101, 103, 100, 50, 51, JSON.stringify];
let P = (l: string) => l.split(" ").map((x) => x.slice(2).split(",").map(Number) as Pos) as [Pos, Pos];
let [O, q, pv] = [(a: number, B: number) => (a >= B ? a - B : a < 0 ? a + B : a), [[0, 0] as Pos, [0, 0] as Pos], L.map(P)];
let A = ([px, py]: Pos, [vx, vy]: Pos, [npx, npy] = [px + vx, py + vy]) => [O(npx, X), O(npy, Y)] as Pos;

let W = (p = pv.map(([p, v]) => Arr.range(0, T).reduce((acc) => A(acc, v), p))) => {
  p.filter(([r, c]) => r !== xm && c !== ym).forEach(([r, c]) => q[r < xm ? 0 : 1][c < ym ? 0 : 1]++);
  return q[0][0] * q[0][1] * q[1][0] * q[1][1];
};

let Q = (t = 0) => {
  while (new Set(pv.map((x) => K(x[0]))).size !== pv.length) [pv, t] = [pv.map(([p, v]) => [A(p, v), v]), t + 1];
  return t;
};

export default defineAocModule({
  day: 14,
  exp1: 232_253_028,
  exp2: 8179,
  sol1: () => W(),
  sol2: () => Q(),
});
