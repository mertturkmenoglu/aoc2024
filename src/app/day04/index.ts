import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day04/input.txt");
const g: string[][] = gridify(lines);

function gridify(rows: string[]): string[][] {
  return rows.map((s) => s.split(""));
}

function searchLine(line: string): number {
  const [a, b] = [/XMAS/g, /SAMX/g].map((r) => [...line.matchAll(r)].length);
  return a + b;
}

function checkDiagonals(r: number, c: number): number {
  return [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ].filter(
    ([a, b]) =>
      g[r][c] +
        g[r + a]?.[c + b] +
        g[r + 2 * a]?.[c + 2 * b] +
        g[r + 3 * a]?.[c + 3 * b] ===
      "XMAS",
  ).length;
}

function check2(r: number, c: number): number {
  let count = 0;
  const el = g[r][c];

  if (el !== "M" && el !== "S") {
    return 0;
  }

  const comp = el === "M" ? "S" : "M";

  if (g[r + 1]?.[c + 1] === "A" && g[r + 2]?.[c + 2] === comp) {
    const val = g[r + 2]?.[c] + g[r + 1]?.[c + 1] + g[r]?.[c + 2];
    if (val === "SAM" || val === "MAS") {
      count++;
    }
  }

  return count;
}

function getCol(a: number): string[] {
  return g.map((row) => row[a]);
}

function sol1(): number {
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    count += searchLine(lines[i]);
  }

  for (let i = 0; i < g[0].length; i++) {
    const col = getCol(i);
    count += searchLine(col.join(""));
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      count += checkDiagonals(i, j);
    }
  }

  return count;
}

function sol2(): number {
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      count += check2(i, j);
    }
  }

  return count;
}

export default defineAocModule({
  day: 4,
  exp1: 2517,
  exp2: 1960,
  sol1,
  sol2,
});
