import { defineAocModule, readLines as R, sum } from "@/lib";

let L = R("day07/input.txt").map((l) => l.split(":"));
let E = L.map(([a, b]) => [+a, b.trim().split(" ").map(Number)] as const);
let A = (C: number, e: number, F: boolean) => (F ? [C + e, C * e, +`${C}${e}`] : [C + e, C * e]);
let c = (T: number, C: number, N: number[], F: boolean): boolean => (!!N[0] ? A(C, N[0], F).some((x) => c(T, x, N.slice(1), F)) : T === C);
let S = (T: number, N: number[], s1 = true) => c(T, N[0], N.slice(1), !s1);

export default defineAocModule({
  day: 7,
  exp1: 21_572_148_763_543,
  exp2: 581_941_094_529_163,
  sol1: () => sum(E.map((eq) => (S(eq[0], eq[1]) ? eq[0] : 0))),
  sol2: () => sum(E.map((eq) => (S(eq[0], eq[1], false) ? eq[0] : 0))),
});
