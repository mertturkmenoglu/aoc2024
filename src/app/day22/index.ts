import { Arr, defineAocModule, readLines } from "@/lib";

let [N, P, M] = [readLines("day22/input.txt").map((x) => BigInt(x)), 16_777_216n, (n: bigint) => ((n * 64n) ^ n) % P];
let [D, O] = [(n: bigint) => ((n / 32n) ^ n) % P, (n: bigint) => ((n * 2048n) ^ n) % P];
let C = (n: bigint, i = 0): bigint => (i >= 2000 ? n : C(O(D(M(n))), i + 1));

function sol2(): number {
  let seqtotal = new Map<string, number>();

  for (let num of N) {
    let seen = new Set<string>();
    let buyer = [num % 10n];
    buyer.push(
      ...Arr.range(0, 2000).map(() => {
        num = O(D(M(num)));
        return num % 10n;
      }),
    );

    for (let i = 0; i < buyer.length - 4; i++) {
      let [a, b, c, d, e] = buyer.slice(i, i + 5).map(Number);
      let s = JSON.stringify([b - a, c - b, d - c, e - d]);
      if (!seen.has(s)) {
        seen.add(s);
        seqtotal.set(s, (seqtotal.get(s) ?? 0) + e);
      }
    }
  }

  return Arr.max([...seqtotal.values()]);
}

export default defineAocModule({
  day: 22,
  exp1: 17_965_282_217n,
  exp2: 2152,
  sol1: () => N.map((x) => C(x)).reduce((acc, x) => acc + x, 0n),
  sol2: sol2,
});
