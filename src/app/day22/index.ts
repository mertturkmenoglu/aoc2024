import { defineAocModule, readLines } from "@/lib";

let [N, P, M] = [readLines("day22/input.txt").map((x) => BigInt(x)), 16_777_216n, (n: bigint) => ((n * 64n) ^ n) % P];
let [D, O] = [(n: bigint) => ((n / 32n) ^ n) % P, (n: bigint) => ((n * 2048n) ^ n) % P];
let C = (n: bigint, i = 0): bigint => (i >= 2000 ? n : C(O(D(M(n))), i + 1));

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 22,
  exp1: 17_965_282_217n,
  exp2: 0,
  sol1: () => N.map((x) => C(x)).reduce((acc, x) => acc + x, 0n),
  sol2,
});
