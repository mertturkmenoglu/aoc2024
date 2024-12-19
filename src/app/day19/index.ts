import { defineAocModule, readLines, sum } from "@/lib";

let L = readLines("day19/input.txt");
let [P, D, C] = [L[0].split(", "), L.slice(2), new Map<string, number>()];
let A = (d: string) => C.set(d, sum(P.map((x) => (d.startsWith(x) ? W(d.slice(x.length)) : 0)))).get(d)!;
let W = (d: string): number => (d.length === 0 ? 1 : C.has(d) ? C.get(d)! : A(d));
let S = (s = false) => [C.clear()].map(() => D.reduce((acc, x) => (W(x) > 0 ? acc + (s ? W(x) : 1) : acc), 0))[0];

export default defineAocModule({
  day: 19,
  exp1: 371,
  exp2: 650_354_687_260_341,
  sol1: () => S(),
  sol2: () => S(true),
});
