import { defineAocModule, nums, readLines } from "@/lib";

let L = readLines("day17/input.txt");
let parse = () => [BigInt(nums(L[0])[0]), BigInt(nums(L[1])[0]), BigInt(nums(L[2])[0]), nums(L[4]).map(BigInt)] as const;

function compute(R?: bigint): string {
  let [ra, rb, rc, program] = parse();
  let ip = 0;
  let output: bigint[] = [];
  ra = R !== undefined ? R : ra;

  let getCombo = (op: bigint): bigint => {
    if (op >= 0n && op <= 3n) return BigInt(op);
    if (op === 4n) return ra;
    if (op === 5n) return rb;
    if (op === 6n) return rc;
    throw new Error("combo operand 7");
  };

  while (ip < program.length) {
    let ins = program[ip];
    let operand = program[ip + 1];

    if (ins === 0n) {
      let c = getCombo(operand);
      ra = ra / 2n ** c;
      ip += 2;
    } else if (ins === 1n) {
      rb = rb ^ operand;
      ip += 2;
    } else if (ins === 2n) {
      let c = getCombo(operand);
      rb = c % 8n;
      ip += 2;
    } else if (ins === 3n) {
      if (ra === 0n) {
        ip += 2;
      } else {
        ip = Number(operand);
      }
    } else if (ins === 4n) {
      rb = rb ^ rc;
      ip += 2;
    } else if (ins === 5n) {
      let c = getCombo(operand);
      output.push(c % 8n);
      if (R !== undefined && !program.join(",").startsWith(output.join(","))) {
        return output.join(",");
      }
      ip += 2;
    } else if (ins === 6n) {
      let c = getCombo(operand);
      rb = ra / 2n ** c;
      ip += 2;
    } else if (ins === 7n) {
      let c = getCombo(operand);
      rc = ra / 2n ** c;
      ip += 2;
    } else {
      throw new Error("unknown instruction" + ins);
    }
  }

  return output.join(",");
}

function sol1(): string {
  return compute();
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 17,
  exp1: "3,1,4,3,1,7,1,6,3",
  exp2: 0,
  sol1,
  sol2,
});
