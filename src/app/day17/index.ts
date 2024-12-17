import { defineAocModule, nums, readLines } from "@/lib";

let L = readLines("day17/input.txt");
let parse = () => [BigInt(nums(L[0])[0]), BigInt(nums(L[1])[0]), BigInt(nums(L[2])[0]), nums(L[4]).map(BigInt)] as const;

function compute(R?: bigint): string {
  let [ra, rb, rc, program] = parse();
  let ip = 0;
  let output: bigint[] = [];
  ra = R !== undefined ? R : ra;

  let C = (op: bigint): bigint => {
    if (op === 7n) throw new Error("combo operand 7");
    if (op >= 0n && op <= 3n) return BigInt(op);
    return [ra, rb, rc][Number(op - 4n)];
  };

  while (ip < program.length) {
    let [I, op] = [program[ip], program[ip + 1]];

    if (I === 0n) ra /= 2n ** C(op);
    else if (I === 1n) rb ^= op;
    else if (I === 2n) rb = C(op) % 8n;
    else if (I === 3n && ra !== 0n) ip = Number(op) - 2;
    else if (I === 4n) rb ^= rc;
    else if (I === 6n) rb = ra / 2n ** C(op);
    else if (I === 7n) rc = ra / 2n ** C(op);
    else if (I === 5n) {
      output.push(C(op) % 8n);
      if (R !== undefined && !program.join(",").startsWith(output.join(","))) {
        return output.join(",");
      }
    }

    ip += 2;
  }

  return output.join(",");
}

export default defineAocModule({
  day: 17,
  exp1: "3,1,4,3,1,7,1,6,3",
  exp2: 0,
  sol1: () => compute(),
  sol2: () => 0,
});
