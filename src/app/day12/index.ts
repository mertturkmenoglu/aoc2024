import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posAdd, posEq, sum } from "@/lib";

const lines: string[] = readLines("day12/input.txt");
let [K, V, Z] = [JSON.stringify, JSON.parse, (S: Set<string>) => [...S.entries()].map(([s]) => V(s) as [Pos, string])];
let [g, go, H] = [lines.map((l) => l.split("")), lines.map((l) => l.split("")), (arr: Pos[], a: Pos) => arr.some((x) => posEq(x, a))];
let P = (r: Pos[]) => sum(r.map((p) => 4 - adj.filter((dp) => Mtr.$at(go, posAdd(p, dp)) === Mtr.at(go, p)).length));
let X = (r: Pos[], S = false) => r.length * (S ? N(r) : P(r));
let D = (u: string[][], b: Pos[]) => b.forEach((p) => Mtr.set(u, p, "."));
let E = (m: Map<string, Pos[][]>, v: string, p: Pos) => m.set(v, [...(m.get(v) ?? []), G(v, p)]).get(v)!;
let A = (u: string[][], m = new Map<string, Pos[][]>()) => {
  Mtr.forEachCell(u, (v, i, j) => (v !== "." ? D(u, E(m, v, [i, j]).at(-1)!) : {}));
  return m;
};
let w = (p: Pos, s: string): [Pos, string] => [p, s];
let T = [w([0, -1], "L"), w([0, 1], "R"), w([1, 0], "T"), w([-1, 0], "B")];

function G(C: string, S: Pos, O = [S] as Pos[], L = [] as Pos[], R = [] as Pos[]): Pos[] {
  while (O.length > 0) {
    let [_, q] = [L.push(O[0]), O.shift()!];
    R.push(...[q].filter((x) => Mtr.$at(g, x) === C));
    O.push(...adj.map((p) => posAdd(q, p)).filter((c) => !(H(L, c) || H(O, c) || Mtr.$at(g, c) !== C)));
  }
  return R;
}

function N(n: Pos[]): number {
  let S = new Set(n.flatMap((p) => T.filter(([dp]) => Mtr.$at(go, posAdd(p, dp)) !== Mtr.at(go, p)).map(([_, dir]) => K([p, dir]))));
  Z(S).forEach(([[r, c], dir]) => [K([[r, c - 1], dir]), K([[r - 1, c], dir])].forEach((k) => (S.has(k) ? S.delete(k) : {})));
  return S.size;
}

export default defineAocModule({
  day: 12,
  exp1: 1_485_656,
  exp2: 899_196,
  sol1: () => sum([...A(V(K(g))).values()].flatMap((rs) => rs.map((r) => X(r)))),
  sol2: () => sum([...A(V(K(g))).values()].flatMap((rs) => rs.map((r) => X(r, true)))),
});
