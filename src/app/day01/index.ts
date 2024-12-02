import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day01/input.txt");

// Split line by whitespace, then filter empty elements.
// Rest should be 2 elements, convert from string to number,
// return as a tuple.
function parseLine(line: string): [number, number] {
  const parts = line.split(" ").filter((x) => x != "");
  const fst = +parts[0];
  const snd = +parts[1];
  return [fst, snd];
}

// Return two number arrays.
// A parsed line consist of two numbers.
// Add the first to left list (ll).
// Add the second to right list (rl).
// Return lists as a tuple.
function constructLeftRightLists(
  parsedLines: [number, number][],
): [number[], number[]] {
  const len = parsedLines.length;
  const ll = new Array(len).fill(0);
  const rl = new Array(len).fill(0);

  for (let i = 0; i < len; i++) {
    const [l, r] = parsedLines[i];
    ll[i] = l;
    rl[i] = r;
  }

  return [ll, rl];
}

// Get left and right lists
// Sort them ascending
// Zip and enumerate
// Take the diff of each corresponding element pair.
// Take the sum
function sol1(): number {
  const parsed = lines.map(parseLine);
  const [ll, rl] = constructLeftRightLists(parsed);

  ll.sort((a, b) => a - b);
  rl.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < ll.length; i++) {
    sum += Math.abs(ll[i] - rl[i]);
  }

  return sum;
}

// Get left and right lists
// Traverse each item in left list.
// Count how many times it occurs in right list.
// Calculate similarity score.
// Take the sum
function sol2(): number {
  const parsed = lines.map(parseLine);
  const [ll, rl] = constructLeftRightLists(parsed);
  const len = ll.length;

  let sum = 0;

  for (let i = 0; i < len; i++) {
    let counter = 0;

    for (let j = 0; j < len; j++) {
      if (ll[i] === rl[j]) {
        counter++;
      }
    }

    const simScore = ll[i] * counter;
    sum += simScore;
  }

  return sum;
}

export default defineAocModule({
  day: 1,
  exp1: 2_742_123,
  exp2: 21_328_497,
  sol1,
  sol2,
});
