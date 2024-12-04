import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day04/input.txt");
const grid: string[][] = gridify(lines);

function gridify(rows: string[]): string[][] {
  return rows.map((s) => s.split(""));
}

function searchLine(line: string): number {
  const re1 = /XMAS/g;
  const re2 = /SAMX/g;

  const l1 = [...line.matchAll(re1)].length;
  const l2 = [...line.matchAll(re2)].length;

  return l1 + l2;
}

function checkDiagonals(row: number, col: number): number {
  let count = 0;

  if (grid[row][col] !== "X") {
    return 0;
  }

  const dirs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (let [a, b] of dirs) {
    if (
      grid[row + a]?.[col + b] === "M" &&
      grid[row + 2 * a]?.[col + 2 * b] === "A" &&
      grid[row + 3 * a]?.[col + 3 * b] === "S"
    ) {
      count++;
    }
  }

  return count;
}

function check2(r: number, c: number): number {
  let count = 0;
  const el = grid[r][c];

  if (el !== "M" && el !== "S") {
    return 0;
  }

  const comp = el === "M" ? "S" : "M";

  if (grid[r + 1]?.[c + 1] === "A" && grid[r + 2]?.[c + 2] === comp) {
    if (
      grid[r + 2]?.[c] === "M" &&
      grid[r + 1]?.[c + 1] === "A" &&
      grid[r]?.[c + 2] === "S"
    ) {
      count++;
    } else if (
      grid[r + 2]?.[c] === "S" &&
      grid[r + 1]?.[c + 1] === "A" &&
      grid[r]?.[c + 2] === "M"
    ) {
      count++;
    }
  }

  return count;
}

function getCol(a: number): string[] {
  return grid.map((row) => row[a]);
}

function sol1(): number {
  let count = 0;
  // check rows
  for (let i = 0; i < lines.length; i++) {
    count += searchLine(lines[i]);
  }

  // check cols
  for (let i = 0; i < grid[0].length; i++) {
    const col = getCol(i);
    count += searchLine(col.join(""));
  }

  // check diagonals
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
