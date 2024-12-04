import { defineAocModule, readLines, sum } from "@/lib";

let [L, rg, M] = [readLines("day03/input.txt"), /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g, (s: string) => s.slice(4, -1).split(",").map(Number)];
let [N, I] = [(s: string) => M(s).reduce((acc, x) => acc * x, 1), (s: string) => s.startsWith("mul")];
let A = (l: string) => [...l.matchAll(rg)].map((x) => x[0]);
let [B, F] = [(s: string) => (I(s) ? N(s) : 0), (s: string, e: boolean) => (!I(s) ? s === "do()" : e)];
let C = (l: string) => sum(A(l).map((x) => B(x)));
let D = (l: string) => A(l).reduce(({ e, c }, s) => ({ e: F(s, e), c: c + (F(s, e) ? B(s) : 0) }), { e: true, c: 0 });

export default defineAocModule({
  day: 3,
  exp1: 182_619_815,
  exp2: 80_747_545,
  sol1: () => C(L.join("")),
  sol2: () => D(L.join("")).c,
});
