import { defineAocModule, readLines } from "@/lib";

const lines: string[] = readLines("day24/input.txt");

type Input = {
  initials: [string, number][];
  steps: [string, string, string, string][];
};

function parse(): Input {
  let [fst, snd] = lines.join("\n").split("\n\n");
  return {
    initials: fst
      .split("\n")
      .map((line) => line.split(": ") as [string, string])
      .map(([x, y]) => [x, +y] as [string, number]),
    steps: snd
      .split("\n")
      .map((x) => x.split(" -> "))
      .map(([c, d]) => [...(c.split(" ") as [string, string, string]), d]),
  };
}

function comp1(inp: Input): number {
  let values: [string, number][] = [...inp.initials];
  while (inp.steps.length > 0) {
    let j = 0;
    for (j; j < inp.steps.length; j++) {
      let [gate1, _op, gate2] = inp.steps[j];
      if (values.find((x) => x[0] === gate1) !== undefined && values.find((x) => x[0] === gate2) !== undefined) {
        break;
      }
    }
    let [[gate1, op, gate2, out]] = inp.steps.splice(j, 1);
    let [g1, g2, val] = [values.find((x) => x[0] === gate1)![1], values.find((x) => x[0] === gate2)![1], 0];
    if (op === "AND") val = g1 & g2;
    else if (op === "OR") val = g1 | g2;
    else if (op === "XOR") val = g1 ^ g2;
    values.push([out, val]);
  }
  let zGates = values.filter((x) => x[0].startsWith("z"));
  let sorted = zGates.toSorted().toReversed();
  return parseInt(sorted.map((x) => x[1]).join(""), 2);
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 24,
  exp1: 56_620_966_442_854,
  exp2: 0,
  sol1: () => comp1(parse()),
  sol2,
});
