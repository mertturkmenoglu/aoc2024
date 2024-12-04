import { defineAocModule, readLines } from "@/lib";

let [L, rg] = [readLines("day03/input.txt"), /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g];
let M = (s: string) => s.slice(4, -1).split(",").map(Number);
let N = (s: string) => M(s).reduce((acc, x) => acc * x, 1);
let I = (s: string) => s.startsWith("mul");

function compute(line: string, v: boolean): number {
  let [e, c] = [true, 0];

  for (const [s] of line.matchAll(rg)) {
    e = !I(s) ? v || s === "do()" : e;
    c += e && I(s) ? N(s) : 0;
  }

  return c;
}

export default defineAocModule({
  day: 3,
  exp1: 182_619_815,
  exp2: 80_747_545,
  sol1: () => compute(L.join(""), true),
  sol2: () => compute(L.join(""), false),
});
