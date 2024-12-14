import { Arr, defineAocModule, readLines, type Pos } from "@/lib";

type H = [Pos, Pos][];

let [L, X, Y, T, xm, ym, K] = [readLines("day14/input.txt"), 101, 103, 100, 50, 51, JSON.stringify];
let P = (l: string) => l.split(" ").map((x) => x.slice(2).split(",").map(Number) as Pos) as [Pos, Pos];
let [O, q, pv] = [(a: number, B: number) => (a >= B ? a - B : a < 0 ? a + B : a), [[0, 0] as Pos, [0, 0] as Pos], L.map(P)];
let A = ([px, py]: Pos, [vx, vy]: Pos, [npx, npy] = [px + vx, py + vy]) => [O(npx, X), O(npy, Y)] as Pos;
let [Z, D] = [() => q[0][0] * q[0][1] * q[1][0] * q[1][1], (p: Pos[]) => p.filter(([r, c]) => r !== xm && c !== ym)];
let [E, S] = [(p: Pos[]) => D(p).forEach(([r, c]) => q[r < xm ? 0 : 1][c < ym ? 0 : 1]++), (N: H) => new Set(N.map((x) => K(x[0])))];
let W = (p = pv.map(([p, v]) => Arr.range(0, T).reduce((acc) => A(acc, v), p))) => [E(p)].map(() => Z())[0];
let Q = (N: H, t = 0, s = S(N), g: H = N.map(([p, v]) => [A(p, v), v])): number => (s.size === N.length ? t : Q(g, t + 1));

export default defineAocModule({
  day: 14,
  exp1: 232_253_028,
  exp2: 8179,
  sol1: () => W(),
  sol2: () => Q(pv),
});
