import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day03/input.txt");

function mul(s: string): number {
  let [a, b] = s.slice(4, -1).split(",").map(Number);
  return a * b;
}

// Find mul, do, and don't statements and loop them.
// If v is true (sol 1), calculate mul and sum, else check if enabled.
// Only add to sum if enabled
function compute(line: string, v: boolean): number {
  const regex = /mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g;
  let [sum, enabled] = [0, true];

  for (const [s] of line.matchAll(regex)) {
    const isMul = s.startsWith("mul");
    enabled = !isMul ? v || s === "do()" : enabled;
    sum += enabled && isMul ? mul(s) : 0;
  }

  return sum;
}

function sol1(): number {
  return compute(lines.join(""), true);
}

function sol2(): number {
  return compute(lines.join(""), false);
}

export default defineAocModule({
  day: 3,
  exp1: 182_619_815,
  exp2: 80_747_545,
  sol1,
  sol2,
});
