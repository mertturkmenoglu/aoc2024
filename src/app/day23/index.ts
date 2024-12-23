import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day23/input.txt");
let inp = lines.map((l) => l.split("-") as [string, string]);
let [K, P] = [JSON.stringify, JSON.parse];

let getConnections = () => {
  let c = new Map<string, Set<string>>();

  for (let [a, b] of inp) {
    if (!c.has(a)) c.set(a, new Set([b]));
    if (!c.has(b)) c.set(b, new Set([a]));
    c.set(a, c.get(a)!.add(b));
    c.set(b, c.get(b)!.add(a));
  }

  return c;
};

function comp1(): number {
  let c = getConnections();
  let sets = new Set<string>();

  for (let [x, s] of c) {
    for (let y of s) {
      for (let z of c.get(y)!) {
        if (x !== z && c.get(z)!.has(x)) {
          sets.add(K([x, y, z].toSorted()));
        }
      }
    }
  }

  return [...sets.values()].map((s) => (P(s) as string[]).some((x) => x.startsWith("t"))).filter(Boolean).length;
}

function comp2(): string {
  let c = getConnections();
  let sets = new Set<string>();

  let search = (node: string, required: Set<string>) => {
    let key = K([...required.values()].toSorted());
    if (sets.has(key)) return;

    sets.add(key);

    for (let n of c.get(node)!) {
      if (required.has(n)) continue;
      if (![...required.values()].every((q) => c.get(q)!.has(n))) continue;
      search(n, new Set<string>([...required.values(), n]));
    }
  };

  c.forEach(([x]) => search(x, new Set([x])));

  return [...sets.values()]
    .map((x) => P(x) as string[])
    .toSorted((a, b) => b.length - a.length)[0]
    .toSorted()
    .join(",");
}

export default defineAocModule({
  day: 23,
  exp1: 1337,
  exp2: "aw,fk,gv,hi,hp,ip,jy,kc,lk,og,pj,re,sr",
  sol1: () => comp1(),
  sol2: () => comp2(),
});
