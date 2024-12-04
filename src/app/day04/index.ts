import { defineAocModule, readLines, diagonalCoefs as coefs } from "@/lib";

const lines: string[] = readLines("day04/input.txt");
const g: string[][] = lines.map((l) => l.split(""));
const A = () => new Array(lines.length).fill(0);

function s(line: string): number {
  const [a, b] = [/XMAS/g, /SAMX/g].map((r) => [...line.matchAll(r)].length);
  return a + b;
}

function c1(r: number, c: number): number {
  let _ = [0, 1, 2, 3];
  return coefs
    .map(([a, b]) => _.map((x) => g[r + x * a]?.[c + x * b]).join(""))
    .filter((x) => x === "XMAS").length;
}

function c2(r: number, c: number): number {
  let a = g[r + 1]?.[c + 1];
  let b = "MS".includes(g[r][c]) && a === "A";
  let d = g[r + 2]?.[c + 2] === (g[r][c] === "M" ? "S" : "M");
  let e = b && d && ["SAM", "MAS"].includes(g[r + 2]?.[c] + a + g[r]?.[c + 2]);
  return e ? 1 : 0;
}

function sol1(): number {
  return lines.reduce((acc, l, i) => {
    acc += s(l) + s(g.map((row) => row[i]).join(""));
    return acc + A().reduce((acc, _, j) => acc + c1(i, j), 0);
  }, 0);
}

function sol2(): number {
  return A().reduce((I, _, i) => {
    return I + A().reduce((J, _, j) => J + c2(i, j), 0);
  }, 0);
}

export default defineAocModule({
  day: 4,
  exp1: 2517,
  exp2: 1960,
  sol1,
  sol2,
});
