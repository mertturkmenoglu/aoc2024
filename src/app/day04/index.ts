import { defineAocModule, readLines, diagonalCoefs as F, sum } from "@/lib";

let [L, t, D2] = [readLines("day04/input.txt"), [0, 1, 2, 3], (r: number, c: number) => D([X(r + 1, c + 1), r + 2, c + 2, r, c])];
let [g, P] = [L.map((l) => l.split("")), (x: string) => ["SAM", "MAS"].includes(x)];
let [A, rg, s] = [() => new Array(L.length).fill(0), [/XMAS/g, /SAMX/g], (l: string) => sum(rg.map((r) => [...l.matchAll(r)].length))];
let [X, Y] = [(r: number, c: number) => g[r]?.[c], (i: number) => g.map((r) => r[i]).join("")];
let E = (r: number, c: number) => F.map(([a, b]) => t.map((x) => X(r + x * a, c + x * b)));
let C = (r: number, c: number) => sum(E(r, c).map((x) => +(x.join("") === "XMAS")));
let D = ([m, a, b, r, c]: any) => [X(r, c) + m + X(a, b), X(a, c) + m + X(r, b)].every(P);

export default defineAocModule({
  day: 4,
  exp1: 2517,
  exp2: 1960,
  sol1: () => sum(L.map((l, i) => s(l) + s(Y(i)) + sum(A().map((_, j) => C(i, j))))),
  sol2: () => sum(A().map((_, i) => sum(A().map((_, j) => +D2(i, j))))),
});
