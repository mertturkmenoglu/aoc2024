import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posAdd, posEq, sum } from "@/lib";

const lines: string[] = readLines("day12/input.txt");
const g = lines.map((l) => l.split(""));
const go = lines.map((l) => l.split(""));
let ptr = ((m = new Map<string, Region[]>()): Map<string, Region[]> => {
  Mtr.forEachCell(g, (v, i, j) => {
    if (v === ".") return;
    let r = getRegion(v, [i, j]);
    r.forEach((p) => Mtr.set(g, p, "."));
    m.set(v, [...(m.get(v) ?? []), r]);
  });
  return m;
})();

type Region = Pos[];
type BfsNode = {
  value: Pos;
  parent: BfsNode | null;
};

function getRegion(crop: string, sp: Pos, open = [{ value: sp, parent: null }] as BfsNode[]): Region {
  let close: BfsNode[] = [];
  let reg: Pos[] = [];

  while (open.length > 0) {
    let q = open.shift()!;
    close.push(q);
    if (Mtr.$at(g, q.value) === crop) {
      reg.push(q.value);
    }
    let has = (arr: BfsNode[], a: Pos) => arr.some((x) => posEq(x.value, a));
    let A = adj.map((p) => posAdd(q.value, p)).filter((c) => !(has(close, c) || has(open, c) || Mtr.$at(g, c) !== crop));
    open.push(...A.map((c) => ({ value: c, parent: q })));
  }

  return reg;
}

let price = (r: Region, S = false) => r.length * (S ? sides(r) : perimeter(r));

function sides(region: Region): number {
  let candidates: Pos[] = [];

  for (let [r, c] of region) {
    let tmp: Pos[] = [
      [r - 0.5, c - 0.5],
      [r + 0.5, c - 0.5],
      [r + 0.5, c + 0.5],
      [r - 0.5, c + 0.5],
    ];

    for (let [cr, cc] of tmp) {
      if (!candidates.some((x) => posEq(x, [cr, cc]))) {
        candidates.push([cr, cc]);
      }
    }
  }

  let corners = 0;

  for (let [cr, cc] of candidates) {
    let cfg: boolean[] = [];
    let tmp: Pos[] = [
      [cr - 0.5, cc - 0.5],
      [cr + 0.5, cc - 0.5],
      [cr + 0.5, cc + 0.5],
      [cr - 0.5, cc + 0.5],
    ];
    for (let [sr, sc] of tmp) {
      cfg.push(region.some((x) => posEq(x, [sr, sc])));
    }
    let num = cfg.filter((x) => x).length;
    if (num === 1) {
      corners += 1;
    } else if (num === 2) {
      let K = JSON.stringify;
      let a1 = K([true, false, true, false]);
      let a2 = K([false, true, false, true]);
      let c = K(cfg);

      if (c === a1 || c === a2) {
        corners += 2;
      }
    } else if (num === 3) {
      corners += 1;
    }
  }

  return corners;
}

let perimeter = (r: Region) => sum(r.map((p) => 4 - adj.filter((dp) => Mtr.$at(go, posAdd(p, dp)) === Mtr.at(go, p)).length));

export default defineAocModule({
  day: 12,
  exp1: 1_485_656,
  exp2: 899_196,
  sol1: () => sum([...ptr.values()].flatMap((rs) => rs.map((r) => price(r)))),
  sol2: () => sum([...ptr.values()].flatMap((rs) => rs.map((r) => price(r, true)))),
});
