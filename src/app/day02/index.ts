import { defineAocModule, readLines } from "@/lib";

let L = readLines("day02/input.txt");
let [A, F] = [(n: number) => [...Array(n).keys()], (a: number, b: number) => Math.abs(a - b)];
let D = (l: number[]) => (J(K(l)) ? true : A(l.length).some((i) => J(K(l.toSpliced(i, 1)))));
let K = (l: number[]) => [l, l, l[0] < l[1], A(l.length).slice(1)] as const;
type Z = ReturnType<typeof K>;
let J = ([[a, b], l, lt, B]: Z) => a !== b && !B.some((i) => !(F(l[i], l[i - 1]) <= 3 && F(l[i], l[i - 1]) >= 1 && lt === l[i - 1] < l[i]));

export default defineAocModule({
  day: 2,
  exp1: 379,
  exp2: 430,
  sol1: () => L.map((x) => x.split(" ").map(Number)).filter((l) => J(K(l))).length,
  sol2: () => L.map((x) => x.split(" ").map(Number)).filter((l) => D(l)).length,
});
