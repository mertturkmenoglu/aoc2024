import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posEq, posAdd, sum, type BfsNode } from "@/lib";

type N = BfsNode<Pos>;
let [g, H] = [readLines("day10/input.txt").map((l) => l.split("").map(Number)), (a: N[], c: Pos) => a.some((x) => posEq(c, x.value))];
let [C, K] = [(q: N, path = [] as Pos[]): Pos[] => (q.parent === null ? path : C(q.parent, [...path, q.value])), JSON.stringify];
let [Z, W] = [(q: N) => adj.map((a) => posAdd(q.value, a)), (U: Pos[], q: N) => U.map((c) => ({ value: c, parent: q }))];
let X = (M: Pos[], S: boolean, D: N[], O: N[], v: number) => M.filter((c) => !((!S && H(D, c)) || H(O, c) || v! + 1 !== Mtr.$at(g, c)));

function A(p: Pos, S = false, P = new Set<string>(), O = [{ value: p, parent: null }] as N[], D = [] as N[]): number {
  while (O.length > 0) {
    let [v, _, q] = [Mtr.$at(g, O.at(-1)!.value), D.push(O.at(-1)!), O.pop()!];
    [[v].filter((x) => [9, undefined].includes(x)).map((x) => (x === 9 ? P.add(K(C(q))) : 0)), O.push(...W(X(Z(q), S, D, O, v!), q))];
  }
  return P.size;
}

export default defineAocModule({
  day: 10,
  exp1: 510,
  exp2: 1058,
  sol1: () => sum(Mtr.mapCell(g, (_, i, j) => (g[i][j] === 0 ? A([i, j]) : 0))),
  sol2: () => sum(Mtr.mapCell(g, (_, i, j) => (g[i][j] === 0 ? A([i, j], true) : 0))),
});
