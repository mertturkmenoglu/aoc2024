import { Arr, defineAocModule, readLines, sum } from "@/lib";

let L = readLines("day09/input.txt")[0];
let C = () => Arr.range(0, L.length).flatMap((i) => Arr.repeat(+L[i], i % 2 === 0 ? i / 2 : -1));
let CS = (s: number[]) => sum(Arr.range(0, s.length).map((i) => (s[i] === -1 ? 0 : i * +s[i])));

function move(s: number[], c = s.filter((x) => x === -1).length, I = 0): number[] {
  while (!s.slice(-c).every((x) => x === -1) && (I = s.findLastIndex((x) => x !== -1)) && (s[s.indexOf(-1)] = s[I]) && (s[I] = -1));
  return s;
}

function move2(s: number[], a = G(s), i = a.length - 1, E = 0): number[][] {
  while (i >= 0 && (E = a.findIndex((x, j) => x[0] === -1 && j < i && x.length >= a[i].length))) {
    if (a[i][0] === -1 || E === -1) {
      i--;
      continue;
    }
    let [T, S] = [a[E], [...a[i]]];
    let [D, N] = [T.length - S.length, [S]];
    D > 0 ? N.push(new Array(D).fill(-1)) : i--;
    let [_, j] = [a.splice(E, 1, ...N), a.findLastIndex((x) => x[0] === S[0])];
    Arr.range(0, a[j].length).forEach((k) => (a[j][k] = -1));
  }
  return a;
}

function G(s: number[], A = [] as number[][], i = 0, j = 0): number[][] {
  while (i < s.length && (j = i + 1)) {
    while (s[i] === s[j] && j++);
    [i] = [j, A.push(s.slice(i, j))];
  }
  return A;
}

export default defineAocModule({
  day: 9,
  exp1: 6_225_730_762_521,
  exp2: 6_250_605_700_557,
  sol1: () => CS(move(C())),
  sol2: () => CS(move2(C()).flat()),
});
