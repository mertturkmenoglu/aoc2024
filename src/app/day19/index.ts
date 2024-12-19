import { defineAocModule, readLines, sum } from "@/lib";

let L = readLines("day19/input.txt");
let [P, D, C] = [L[0].split(", "), L.slice(2), new Map<string, number>()];

function W(d: string): number {
  if (d.length === 0) return 1;
  if (C.has(d)) return C.get(d)!;
  return C.set(d, sum(P.map((x) => (d.startsWith(x) ? W(d.slice(x.length)) : 0)))).get(d)!;
}

function S(s = false): number {
  C.clear();
  return D.reduce((acc, x) => (W(x) > 0 ? acc + (s ? W(x) : 1) : acc), 0);
}

export default defineAocModule({
  day: 19,
  exp1: 371,
  exp2: 650_354_687_260_341,
  sol1: () => S(),
  sol2: () => S(true),
});
