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

export function readByEmptyLine(path: string, relative: boolean = true): string[][] {
  return readLines(path, relative)
    .join("\n")
    .split("\n\n")
    .map((group) => group.split("\n"));
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

/**
 * South east - south west - north east - north west directions
 */
export const diagonalCoefs: Array<[number, number]> = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

/**
 * East - South - West - North directions
 */
export const cardinalCoefs: Array<[number, number]> = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

/**
 * Sum every value in the given array.
 * @param arr is the number array
 * @returns sum of the array.
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, x) => acc + x, 0);
}

/**
 * Multiply every value in the given array
 * @param arr is the number array
 * @returns product of the array.
 */
export function prod(arr: number[]): number {
  return arr.reduce((acc, x) => acc * x, 1);
}

/**
 * Finds the greatest common divisor of the two given numbers
 * @param a is the first number
 * @param b is the second number
 * @returns gcd
 */
export function gcd(a: number, b: number): number {
  let temp = b;

  while (b !== 0) {
    b = a % b;
    a = temp;
    temp = b;
  }

  return a;
}

/**
 * Finds the least common multiplier of two given numbers
 * @param a is the first number
 * @param b is the second number
 * @returns lcm
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/**
 * Add two Pos vectors.
 * @param p1 is the first Pos.
 * @param p2 is the second Pos.
 * @returns new Pos
 */
export function posAdd(p1: Pos, p2: Pos): Pos {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

/**
 * Subtract p2 from p1
 * @param p1 is the first Pos.
 * @param p2 is the second Pos.
 * @returns new Pos
 */
export function posSub(p1: Pos, p2: Pos): Pos {
  return [p1[0] - p2[0], p1[1] - p2[1]];
}

/**
 * Check if given Pos params are equal to each other.
 * @param p1 is the first Pos.
 * @param p2 is the second Pos.
 * @returns true if they are equal.
 */
export function posEq(p1: Pos, p2: Pos): boolean {
  return p1[0] === p2[0] && p1[1] === p2[1];
}

/**
 * Reverse the position vector.
 * @param p is the position
 * @returns the new Pos vector.
 */
export function posNeg(p: Pos): Pos {
  return [-p[0], -p[1]];
}

/**
 * Multiply a Pos vector with a scalar value.
 * @param {Pos} p is the position
 * @param {number} scalar is the multiply value
 * @returns {Pos} the new Pos vector.
 */
export function posMul(p: Pos, scalar: number): Pos {
  return [scalar * p[0], scalar * p[1]];
}

/**
 * Get integers from a string.
 *
 * @param s is the string
 * @returns number array
 */
export function nums(s: string): number[] {
  return [...s.matchAll(/-?\d+/g)].map((x) => +x[0]);
}
