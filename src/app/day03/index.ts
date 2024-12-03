import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day03/input.txt");

// take a mul statement like: mul(X,Y)
// calculate X * Y and return it
function mul(s: string): number {
  let [n1, n2] = s
    .replaceAll("mul(", "")
    .replaceAll(")", "")
    .split(",")
    .map(Number);
  return n1 * n2;
}

// Find mul, do, and don't statements
// Loop them.
// If v is true (sol 1), calculate mul and sum
// If v is false (sol 2), alternate between enabled and disabled
// Only calculate mul and add it to sum if it's enabled
function compute(line: string, v: boolean): number {
  const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g;
  let sum = 0;
  let enabled = true;

  for (const [s] of line.matchAll(regex)) {
    const isMul = s.startsWith("mul");

    if (!isMul) {
      enabled = v || s === "do()";
    }

    if (enabled && isMul) {
      sum += mul(s);
    }
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
