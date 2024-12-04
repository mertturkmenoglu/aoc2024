import { defineAocModule, readLines, diagonalCoefs as F, sum } from "@/lib";

type N = number;
type S = string;

let [L, t] = [readLines("day04/input.txt"), [0, 1, 2, 3]];
let [g, P] = [L.map((l) => l.split("")), (x: S) => ["SAM", "MAS"].includes(x)];
let [A, rg] = [() => new Array(L.length).fill(0), [/XMAS/g, /SAMX/g]];
let s = (l: S) => sum(rg.map((r) => [...l.matchAll(r)].length));
let [X, Y] = [(r: N, c: N) => g[r]?.[c], (i: N) => g.map((r) => r[i]).join("")];
let E = (r: N, c: N) =>
  F.map(([a, b]) => t.map((x) => X(r + x * a, c + x * b)));
let C = (r: N, c: N) => sum(E(r, c).map((x) => +(x.join("") === "XMAS")));

let D = (r: N, c: N) => {
  let [m, a, b] = [X(r + 1, c + 1), r + 2, c + 2];
  return [X(r, c) + m + X(a, b), X(a, c) + m + X(r, b)].every(P);
};

export default defineAocModule({
  day: 4,
  exp1: 2517,
  exp2: 1960,
  sol1: () =>
    sum(L.map((l, i) => s(l) + s(Y(i)) + sum(A().map((_, j) => C(i, j))))),
  sol2: () => sum(A().map((_, i) => sum(A().map((_, j) => +D(i, j))))),
});
