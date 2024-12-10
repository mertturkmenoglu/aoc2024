import { defineAocModule, posAdd, posSub as J, readLines, type Pos, Mtr, Arr, posNeg } from "@/lib";

let L = readLines("day08/input.txt");
let [m, K, M, R] = [L.map((l) => l.split("")), JSON.stringify, Mtr.mapCell, Arr.range];
let F = (A = new Map<string, Pos[]>()) => M(m, (c, i, j) => (c !== "." ? A.set(c, A.has(c) ? [...A.get(c)!, [i, j]] : [[i, j]]) : A))[0];

function Y(sol1: boolean, a: Pos, [R, C]: Pos, ii = sol1 ? 1 : 0) {
  let [S, an] = [new Set<string>(), posAdd(a, [ii * R, ii * C])];
  while (Mtr.isOnGrid(m, an) && (sol1 ? ii < 2 : true)) {
    [, an, ii] = [S.add(K(an)), posAdd(a, [(ii + 1) * R, (ii + 1) * C]), ii + 1];
  }
  return S;
}

function Z(P: Pos[], S: boolean) {
  return R(0, P.length - 1).map((i) =>
    R(i + 1, P.length)
      .map((j) => [J(P[i], P[j])].map((D) => Y(S, P[i], D).union(Y(S, P[j], posNeg(D))))[0])
      .reduce((W, x) => W.union(x)),
  );
}

let E = (S: boolean) => [...F().values()].map((P) => Z(P, S).reduce((acc, x) => acc.union(x))).reduce((acc, x) => acc.union(x)).size;

export default defineAocModule({
  day: 8,
  exp1: 249,
  exp2: 905,
  sol1: () => E(true),
  sol2: () => E(false),
});
