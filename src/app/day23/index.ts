import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day23/input.txt");

function parseInput() {
  let rels: [string, string][] = [];
  for (let line of lines) {
    let [a, b] = line.split("-");
    rels.push([a, b]);
  }
  return rels;
}

function comp1(relations: [string, string][]): number {
  let connections = new Map<string, Set<string>>();

  for (let [a, b] of relations) {
    if (connections.has(a)) {
      connections.set(a, connections.get(a)!.add(b));
    } else {
      connections.set(a, new Set<string>().add(b));
    }

    if (connections.has(b)) {
      connections.set(b, connections.get(b)!.add(a));
    } else {
      connections.set(b, new Set<string>().add(a));
    }
  }

  let sets = new Set<string>();

  for (let [x] of connections) {
    for (let y of connections.get(x)!) {
      for (let z of connections.get(y)!) {
        if (x !== z && connections.get(z)!.has(x)) {
          sets.add(JSON.stringify([x, y, z].toSorted()));
        }
      }
    }
  }

  let counter = 0;

  for (let s of sets) {
    let set: string[] = JSON.parse(s);
    if (set.some((x) => x.startsWith("t"))) {
      counter++;
    }
  }

  return counter;
}

function comp2(relations: [string, string][]): string {
  let connections = new Map<string, Set<string>>();

  for (let [a, b] of relations) {
    if (connections.has(a)) {
      connections.set(a, connections.get(a)!.add(b));
    } else {
      connections.set(a, new Set<string>().add(b));
    }

    if (connections.has(b)) {
      connections.set(b, connections.get(b)!.add(a));
    } else {
      connections.set(b, new Set<string>().add(a));
    }
  }

  let sets = new Set<string>();

  let search = (node: string, required: Set<string>) => {
    let key = JSON.stringify([...required.values()].toSorted());
    if (sets.has(key)) {
      return;
    }

    sets.add(key);

    for (let neighbour of connections.get(node)!) {
      if (required.has(neighbour)) {
        continue;
      }

      if (![...required.values()].every((q) => connections.get(q)!.has(neighbour))) {
        continue;
      }

      search(neighbour, new Set<string>([...required.values(), neighbour]));
    }
  };

  for (let [x] of connections) {
    search(x, new Set([x]));
  }

  let arr = [...sets.values()].map((x) => JSON.parse(x) as string[]);

  let len = -1;
  let ind = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > len) {
      len = arr[i].length;
      ind = i;
    }
  }

  return arr[ind].toSorted().join(",");
}

function sol1(): number {
  let inp = parseInput();
  return comp1(inp);
}

function sol2(): string {
  let inp = parseInput();
  return comp2(inp);
}

export default defineAocModule({
  day: 23,
  exp1: 1337,
  exp2: "-",
  sol1,
  sol2,
});
