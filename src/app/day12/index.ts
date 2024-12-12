import { defineAocModule, Mtr, readLines, type Pos, cardinalCoefs as adj, posAdd, posEq, type Matrix } from "@/lib";

const lines: string[] = readLines("day12/input.txt");
const g = lines.map((l) => l.split(""));
const go = lines.map((l) => l.split(""));
const plantToRegions = getPlantToRegions();

type Region = Pos[];
type BfsNode = {
  value: Pos;
  parent: BfsNode | null;
};

function getPlantToRegions(): Map<string, Region[]> {
  const mapping = new Map<string, Region[]>();
  const [r, c] = Mtr.dims(g);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const ch = g[i][j];
      if (ch === ".") {
        continue;
      }

      const region = getRegion(ch, [i, j]);
      const o = mapping.get(ch) ?? [];
      mapping.set(ch, [...o, region]);
      for (let p of region) {
        Mtr.set(g, p, ".");
      }
    }
  }

  return mapping;
}

function getRegion(plant: string, startPos: Pos): Region {
  let startNode: BfsNode = { value: startPos, parent: null };
  let open: BfsNode[] = [startNode];
  let close: BfsNode[] = [];
  let reg: Pos[] = [];

  while (open.length > 0) {
    const q = open.shift()!;
    close.push(q);
    const v = Mtr.$at(g, q.value);
    if (v === plant) {
      reg.push(q.value);
    }

    let children: Pos[] = [];

    for (let p of adj) {
      children.push(posAdd(q.value, p));
    }

    for (let c of children) {
      if (close.some((x) => posEq(x.value, c)) || open.some((x) => posEq(x.value, c))) {
        continue;
      }

      if (Mtr.$at(g, c) !== plant) {
        continue;
      }

      open.push({ value: c, parent: q });
    }
  }

  return reg;
}

function getPricing(region: Region): number {
  let a = area(region);
  let p = perimeter(region);
  return a * p;
}

function getPricing2(region: Region): number {
  let a = area(region);
  let s = sides(region);
  return a * s;
}

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

function area(region: Region): number {
  return region.length;
}

function perimeter(region: Region): number {
  let sum = 0;
  for (let p of region) {
    let plant = Mtr.at(go, p);
    let count = 4;
    for (let dp of adj) {
      let newPos = posAdd(p, dp);
      if (Mtr.$at(go, newPos) === plant) {
        count--;
      }
    }
    sum += count;
  }

  return sum;
}

function sol1(): number {
  let sum = 0;
  for (let [_, regions] of plantToRegions) {
    for (let region of regions) {
      sum += getPricing(region);
    }
  }
  return sum;
}

function sol2(): number {
  let sum = 0;
  for (let [_, regions] of plantToRegions) {
    for (let region of regions) {
      sum += getPricing2(region);
    }
  }
  return sum;
}

export default defineAocModule({
  day: 12,
  exp1: 1_485_656,
  exp2: 899_196,
  sol1,
  sol2,
});
