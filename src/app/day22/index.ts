import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day22/input.txt");

function compute1(): bigint {
  let [sum, prune] = [0n, 16_777_216n];
  for (let n of lines.map(BigInt)) {
    for (let i = 0; i < 2000; i++) {
      n = ((n * 64n) ^ n) % prune;
      n = ((n / 32n) ^ n) % prune;
      n = ((n * 2048n) ^ n) % prune;
    }
    sum += n;
  }
  return sum;
}

function sol1(): bigint {
  return compute1();
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 22,
  exp1: 17_965_282_217n,
  exp2: 0,
  sol1,
  sol2,
});
