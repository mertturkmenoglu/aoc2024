import { defineAocModule, readLines, diagonalCoefs as coefs, sum } from "@/lib";

const [ls] = [readLines("day04/input.txt")];
const [g, t] = [ls.map((l) => l.split("")), [0, 1, 2, 3]];
const [A, rg] = [() => new Array(ls.length).fill(0), [/XMAS/g, /SAMX/g]];
const s = (l: string) => rg.reduce((S, r) => S + [...l.matchAll(r)].length, 0);

function c1(r: number, c: number): number {
  return coefs.reduce((acc, [a, b]) => {
    return acc + +(t.map((x) => g[r + x * a]?.[c + x * b]).join("") === "XMAS");
  }, 0);
}

function c2(r: number, c: number): number {
  let [z, y, x, f] = [g[r][c], c + 2, g[r][c] === "M" ? "S" : "M", r + 2];
  let b = "MS".includes(z) && g[r + 1]?.[c + 1] === "A" && g[f]?.[y] === x;
  return +(b && ["SM", "MS"].includes(g[f]?.[c] + g[r]?.[y]));
}

const sol1 = () =>
  ls.reduce((I, l, i) => {
    I += s(l) + s(g.map((r) => r[i]).join(""));
    return I + A().reduce((J, _, j) => J + c1(i, j), 0);
  }, 0);

const sol2 = () =>
  A().reduce((I, _, i) => I + A().reduce((J, _, j) => J + c2(i, j), 0), 0);

export default defineAocModule({
  day: 4,
  exp1: 2517,
  exp2: 1960,
  sol1,
  sol2,
});
