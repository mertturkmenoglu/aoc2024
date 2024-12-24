import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day24/input.txt");

type Input = {
  initials: [string, number][];
  steps: [string, string, string, string][];
};

function parse(): Input {
  let [fst, snd] = lines.join("\n").split("\n\n");
  let initials = fst.split("\n").map((line) => {
    let parts = line.split(": ");
    return [parts[0], +parts[1]] as [string, number];
  });
  let a = snd.split("\n");
  let b = a.map((x) => x.split(" -> "));
  let out: [string, string, string, string][] = [];
  for (let [c, d] of b) {
    let [gate1, op, gate2] = c.split(" ");
    out.push([gate1, op, gate2, d]);
  }
  return {
    initials,
    steps: out,
  };
}

function comp1(inp: Input): number {
  let values: [string, number][] = [...inp.initials];
  while (inp.steps.length > 0) {
    let j = 0;
    for (j; j < inp.steps.length; j++) {
      let [gate1, _op, gate2] = inp.steps[j];
      let g1 = values.find((x) => x[0] === gate1);
      let g2 = values.find((x) => x[0] === gate2);
      if (g1 !== undefined && g2 !== undefined) {
        break;
      }
    }
    let [[gate1, op, gate2, out]] = inp.steps.splice(j, 1);
    let g1 = values.find((x) => x[0] === gate1)![1];
    let g2 = values.find((x) => x[0] === gate2)![1];
    let val = 0;
    if (op === "AND") {
      val = g1 & g2;
    } else if (op === "OR") {
      val = g1 | g2;
    } else if (op === "XOR") {
      val = g1 ^ g2;
    }
    values.push([out, val]);
  }
  let zGates = values
    .filter((x) => x[0].startsWith("z"))
    .toSorted()
    .toReversed()
    .map((x) => x[1])
    .join("");
  return parseInt(zGates, 2);
}

function sol1(): number {
  let inp = parse();
  return comp1(inp);
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 24,
  exp1: 0,
  exp2: 0,
  sol1,
  sol2,
});
