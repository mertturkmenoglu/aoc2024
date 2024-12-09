import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day09/input.txt");
const line = lines[0];

function construct(): string[] {
  let s: string[] = [];
  let id = 0;
  let isFile = true;

  for (const ch of line) {
    let n = +ch;
    let newCh = isFile ? `${id}` : ".";

    for (let i = 0; i < n; i++) {
      s.push(newCh);
    }

    if (isFile) {
      id++;
    }

    isFile = !isFile;
  }

  return s;
}

function move(s: string[]): string[] {
  const totalDotCount = s.filter((x) => x === ".").length;
  while (!s.slice(-totalDotCount).every((x) => x === ".")) {
    let firstDotIndex = s.findIndex((x) => x === ".");
    let lastDigitIndex = s.findLastIndex((x) => x !== ".");
    s[firstDotIndex] = s[lastDigitIndex];
    s[lastDigitIndex] = ".";
  }

  return s;
}

function checksum(s: string[]): number {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ".") continue;
    let n = +s[i];
    sum += i * n;
  }
  return sum;
}

function sol1(): number {
  console.log("started");
  const s = construct();
  console.log("constructed");
  // const exp = "00...111...2...333.44.5555.6666.777.888899";
  const newS = move(s);
  console.log("moved");
  // const exp = "0099811188827773336446555566..............";
  // console.log(newS);
  // console.log(newS === exp);
  const chksm = checksum(newS);
  console.log("chsm complete");

  return chksm;
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 9,
  exp1: 0,
  exp2: 0,
  sol1,
  sol2,
});
