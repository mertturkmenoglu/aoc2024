import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day22/input.txt");
let initials = lines.map((x) => +x);

function compute1(): bigint {
  let sum = 0n;
  let prune = 16_777_216n;
  for (let num of initials) {
    let n = BigInt(num);
    for (let i = 0; i < 2000; i++) {
      let mul = n * 64n;
      n = mul ^ n;
      n = n % prune;
      let div = n / 32n;
      n = div ^ n;
      n = n % prune;
      let m2 = n * 2048n;
      n = m2 ^ n;
      n = n % prune;
    }
    sum += n;
  }
  return sum;
}

function sol1(): number {
  const res = compute1();
  console.log({ res });
  return -1;
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 22,
  exp1: 0,
  exp2: 0,
  sol1,
  sol2,
});
