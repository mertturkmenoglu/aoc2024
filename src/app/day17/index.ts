import { defineAocModule, nums, readLines } from "@/lib";

const lines: string[] = readLines("day17/input.txt");

// 0 adv: Div A by 2**combo, truncate to int, write back to A
// 1 bxl: Bitwise XOR B with literal, store it back to B
// 2 bst: combo mod 8, write to B
// 3 jnz: if A == 0, do nothing. else, jump by literal. IP does not increase
// 4 bxc: bitwise xor B and C. read operand but ignore it. store back to B.
// 5 out: combo mod 8, output (sep by comma)
// 6 bdv: A div by 2**combo, truncate it to int, write to B.
// 7 cdv: A div by 2**combo, truncate it to int, write to C.

function parse(): [number, number, number, number[]] {
  let regA = nums(lines[0])[0];
  let regB = nums(lines[1])[0];
  let regC = nums(lines[2])[0];
  let program = nums(lines[4]);
  return [regA, regB, regC, program];
}

function compute(): string {
  let [ra, rb, rc, program] = parse();
  let ip = 0;
  let output: number[] = [];

  let getCombo = (op: number): number => {
    if (op >= 0 && op <= 3) return op;
    if (op === 4) return ra;
    if (op === 5) return rb;
    if (op === 6) return rc;
    throw new Error("combo operand 7");
  };

  while (ip < program.length) {
    let ins = program[ip];
    let operand = program[ip + 1];

    if (ins === 0) {
      let c = getCombo(operand);
      ra = Math.trunc(ra / Math.pow(2, c));
      ip += 2;
    } else if (ins === 1) {
      rb = rb ^ operand;
      ip += 2;
    } else if (ins === 2) {
      let c = getCombo(operand);
      rb = c % 8;
      ip += 2;
    } else if (ins === 3) {
      if (ra === 0) {
        ip += 2;
      } else {
        ip = operand;
      }
    } else if (ins === 4) {
      rb = rb ^ rc;
      ip += 2;
    } else if (ins === 5) {
      let c = getCombo(operand);
      output.push(c % 8);
      ip += 2;
    } else if (ins === 6) {
      let c = getCombo(operand);
      rb = Math.trunc(ra / Math.pow(2, c));
      ip += 2;
    } else if (ins === 7) {
      let c = getCombo(operand);
      rc = Math.trunc(ra / Math.pow(2, c));
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
