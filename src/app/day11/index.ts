import { Arr, defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day11/input.txt");
const line = lines[0];
const inp = line.split(" ").map(Number);

function newNumbers(n: number): number[] {
  if (n === 0) {
    return [1];
  }

  let len = `${n}`.length;

  if (len % 2 === 0) {
    return [+`${n}`.slice(0, len / 2), +`${n}`.slice(len / 2)];
  }

  return [n * 2024];
}

function blink(numbers: number[]): number[] {
  return numbers.flatMap((n) => newNumbers(n));
}

function blink2(stones: Map<number, number>): Map<number, number> {
  let ns = new Map<number, number>();

  for (let [stone, amount] of stones.entries()) {
    newNumbers(stone).forEach((n) => ns.set(n, (ns.get(n) ?? 0) + amount));
  }

  return ns;
}

function sol1(): number {
  return Arr.range(0, 25).reduce((acc) => blink(acc), [...inp]).length;
}

function sol2(): number {
  let c = new Map<number, number>();
  for (let n of inp) {
    c.set(n, 1);
  }
  for (let i = 0; i < 75; i++) {
    c = blink2(c);
  }
  return [...c.values()].reduce((acc, x) => acc + x);
}

export default defineAocModule({
  day: 11,
  exp1: 186_996,
  exp2: 221_683_913_164_898,
  sol1,
  sol2,
});
