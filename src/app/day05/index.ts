import { defineAocModule, permutation, readLines, sum } from "@/lib";

type V = Map<number, number>;

let [L, A] = [readLines("day05/input.txt"), (n: number) => [...new Array(n).keys()]];
let [E, re] = [L.findIndex((l) => l.length === 0), (u: number[]) => J(u).filter((r) => u.indexOf(r[0]) !== -1)];
let R = A(E).map((i) => L[i].split("|").map(Number) as [number, number]);
let [U, F] = [A(L.length - E - 1).map((i) => L[i + E + 1].split(",").map(Number)), (): V => new Map()];
let [M, Q] = [(u: number[]) => u[Math.floor(u.length / 2)], (f: V, Y: number) => f.set(Y, f.has(Y) ? f.get(Y)! + 1 : 1)];
let J = (u: number[]) => u.map((Y) => R.filter((r) => r[0] === Y || r[1] === Y)).flat();
let [W, T] = [(Y: number) => R.filter((r) => r.some((x) => x === Y)), (r: [number, number], u: number[]) => r.map((x) => u.indexOf(x))];
let G = (f: V) => [...f.entries()].toSorted((a, b) => b[1] - a[1]).map((x) => x[0]);
let C = (u: number[]) => !u.some((el) => W(el).some((r) => [T(r, u)].map((a) => a[0] >= a[1] && a.every((x) => x !== -1))[0]));
let O = (u: number[]) => G([F()].map((f) => re(u).map(([el]) => Q(f, el))[0])[0]);

export default defineAocModule({
  day: 5,
  exp1: 6505,
  exp2: 6897,
  sol1: () => sum(U.filter((u) => C(u)).map((u) => M(u))),
  sol2: () => sum(U.filter((u) => !C(u)).map((u) => M(O(u)))),
});
