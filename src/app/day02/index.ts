import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day02/input.txt");

// Convert string to number array
function parseLine(line: string): number[] {
  return line.split(" ").map(Number);
}

// Check the number array.
// First check the 2 elements.
// If they are equal, return false
// Find the level trend.
// For each pair, find diff and trend.
// Check diff.
// Compare trend with levelTrend.
function isSafeLevel(level: number[]): boolean {
  if (level[0] === level[1]) {
    return false;
  }

  const levelTrend = level[0] < level[1];

  for (let i = 1; i < level.length; i++) {
    const diff = Math.abs(level[i] - level[i - 1]);

    if (diff > 3 || diff < 1) {
      return false;
    }

    const trend = level[i - 1] < level[i];

    if (levelTrend !== trend) {
      return false;
    }
  }

  return true;
}

// Check if level is safe.
// If not, remove an element at each step.
// Check the new array for safety.
function dampener(level: number[]): boolean {
  if (isSafeLevel(level)) {
    return true;
  }

  for (let i = 0; i < level.length; i++) {
    const newLevel = level.toSpliced(i, 1);

    if (isSafeLevel(newLevel)) {
      return true;
    }
  }

  return false;
}

function sol1(): number {
  const reports = lines.map(parseLine);
  let counter = 0;

  for (const line of reports) {
    if (isSafeLevel(line)) {
      counter++;
    }
  }

  return counter;
}

function sol2(): number {
  const reports = lines.map(parseLine);
  let counter = 0;

  for (const level of reports) {
    if (dampener(level)) {
      counter++;
    }
  }

  return counter;
}

export default defineAocModule({
  day: 2,
  exp1: 379,
  exp2: 430,
  sol1,
  sol2,
});
