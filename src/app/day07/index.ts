import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day07/input.txt");
let equations: [number, number[]][] = parseInput();

function parseInput() {
  const arr: [number, number[]][] = [];

  for (const line of lines) {
    const [a, b] = line.split(":");
    const nums = b.trim().split(" ").map(Number);
    arr.push([+a, nums] as const);
  }

  return arr;
}

function c(target: number, current: number, nums: number[]): boolean {
  const el = nums[0];

  if (el === undefined) {
    return target === current;
  }

  let r1 = c(target, current + el, nums.slice(1));

  if (r1) {
    return true;
  }

  let r2 = c(target, current * el, nums.slice(1));

  if (r2) {
    return true;
  }

  return false;
}

function c2(target: number, current: number, nums: number[]): boolean {
  const el = nums[0];

  if (el === undefined) {
    return target === current;
  }

  let r1 = c2(target, current + el, nums.slice(1));

  if (r1) {
    return true;
  }

  let r2 = c2(target, current * el, nums.slice(1));

  if (r2) {
    return true;
  }

  let r3 = c2(target, parseInt(`${current}${el}`), nums.slice(1));

  if (r3) {
    return true;
  }

  return false;
}

function isSolvable(target: number, nums: number[], s1 = true): boolean {
  return s1
    ? c(target, nums[0], nums.slice(1))
    : c2(target, nums[0], nums.slice(1));
}

function sol1(): number {
  let sum = 0;

  for (let eq of equations) {
    if (isSolvable(eq[0], eq[1])) {
      sum += eq[0];
    }
  }

  return sum;
}

function sol2(): number {
  let sum = 0;

  for (let eq of equations) {
    if (isSolvable(eq[0], eq[1], false)) {
      sum += eq[0];
    }
  }

  return sum;
}

export default defineAocModule({
  day: 7,
  exp1: 21_572_148_763_543,
  exp2: 581_941_094_529_163,
  sol1,
  sol2,
});
