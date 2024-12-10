import fs from "fs";
import type { Pos } from "./types";

export function isNumberString(s: string): boolean {
  return !isNaN(parseFloat(s));
}

export function readLines(path: string, relative: boolean = true): string[] {
  const base = "src/app/";
  const truePath = relative ? base + path : path;
  return fs.readFileSync(truePath).toString().split("\n");
}

export function formatTime(t: number): string {
  return `${t.toFixed(4)} milliseconds`;
}

export function permutation<T>(arr: T[]): T[][] {
  const all: T[][] = [];

  function heapPermutation(a: T[], size: number, n: number) {
    if (size == 1) all.push(a.slice(0, n));

    for (let i = 0; i < size; i++) {
      heapPermutation(a, size - 1, n);

      if (size % 2 == 1) {
        let temp = a[0];
        a[0] = a[size - 1];
        a[size - 1] = temp;
      } else {
        let temp = a[i];
        a[i] = a[size - 1];
        a[size - 1] = temp;
      }
    }
  }

  heapPermutation(arr, arr.length, arr.length);

  return all;
}

export const diagonalCoefs: Array<[number, number]> = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export const cardinalCoefs: Array<[number, number]> = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function sum(arr: number[]): number {
  return arr.reduce((acc, x) => acc + x, 0);
}

export function prod(arr: number[]): number {
  return arr.reduce((acc, x) => acc * x, 1);
}

export function gcd(a: number, b: number): number {
  let temp = b;

  while (b !== 0) {
    b = a % b;
    a = temp;
    temp = b;
  }

  return a;
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function posAdd(p1: Pos, p2: Pos): Pos {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

export function posSub(p1: Pos, p2: Pos): Pos {
  return [p1[0] - p2[0], p1[1] - p2[1]];
}

export function posEq(p1: Pos, p2: Pos): boolean {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

export function posNeg(p: Pos): Pos {
  return [-p[0], -p[1]];
}
