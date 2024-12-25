import { defineAocModule, Mtr, readByEmptyLine, type Matrix } from "@/lib";

let [K, L] = [[] as number[][], [] as number[][]];
let G = readByEmptyLine("day25/input.txt").map((g) => g.map((x) => x.split("")));
let H = (m: Matrix<string>) => m[0].map((_, i) => Mtr.col(m, i).filter((x) => x === "#").length);
let F = (kh: number[], lh: number[]) => kh.every((k, i) => k + lh[i] <= 7);
let C = () => K.map((k) => L.map((l) => F(k, l)).filter(Boolean).length).reduce((acc, x) => acc + x, 0);
(() => G.forEach((g) => (Mtr.row(g, 0).every((x) => x === "#") ? L : K).push(H(g))))();

export default defineAocModule({
  day: 25,
  exp1: 3663,
  exp2: 0,
  sol1: () => C(),
  sol2: () => 0,
});
