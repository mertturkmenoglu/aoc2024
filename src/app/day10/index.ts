import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posEq, posAdd, sum, type BfsNode } from "@/lib";

let [L, K] = [readLines("day10/input.txt"), JSON.stringify];
let [g, H] = [L.map((l) => l.split("").map(Number)), (a: N[], c: Pos) => a.some((x) => posEq(c, x.value))];
type N = BfsNode<Pos>;
let C = (q: N, path = [] as Pos[]): Pos[] => (q.parent === null ? path : C(q.parent, [...path, q.value]));

function A(p: Pos, S = false): number {
  let [P, O, D]: [Set<string>, N[], N[]] = [new Set(), [{ value: p, parent: null }], []];

  while (O.length > 0) {
    let [v, _, q] = [Mtr.$at(g, O.at(-1)!.value), D.push(O.at(-1)!), O.pop()!];
    [v].filter((x) => [9, undefined].includes(x)).map((x) => (x === 9 ? P.add(K(C(q))) : 0));
    let Y = adj.map((a) => posAdd(q.value, a)).filter((c) => !((!S && H(D, c)) || H(O, c) || v! + 1 !== Mtr.$at(g, c)));
    O.push(...Y.map((c) => ({ value: c, parent: q })));
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
