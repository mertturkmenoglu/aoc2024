import { defineAocModule, permutation, readLines } from "@/lib";

type Rule = [number, number];
type Update = number[];

type Data = {
  rules: Rule[];
  updates: Update[];
};

function parseInput(): Data {
  const emptyLineIndex = lines.findIndex((line) => line.length === 0);
  const rulesArr: Rule[] = [];
  const updatesArr: Update[] = [];

  for (let i = 0; i < emptyLineIndex; i++) {
    const line = lines[i];
    const [a, b] = line.split("|");
    rulesArr.push([+a, +b]);
  }

  for (let i = emptyLineIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    updatesArr.push(line.split(",").map(Number));
  }

  return {
    rules: rulesArr,
    updates: updatesArr,
  };
}

const lines: string[] = readLines("day05/input.txt");
const { rules, updates }: Data = parseInput();

function isCorrect(update: Update): boolean {
  for (const el of update) {
    const relatedRules = rules.filter((r) => r[0] === el || r[1] === el);

    for (const [a, b] of relatedRules) {
      const ai = update.indexOf(a);
      const bi = update.indexOf(b);

      if (ai === -1 || bi === -1) {
        continue;
      }

      if (ai >= bi) {
        return false;
      }
    }
  }

  return true;
}

function order(update: Update): Update {
  const rr: Rule[] = [];

  for (const el of update) {
    const related = rules.filter((r) => r[0] === el || r[1] === el);
    rr.push(...related);
  }

  // element - how many rules
  const freq = new Map<number, number>();

  for (const r of rr) {
    const el = r[0];
    if (update.indexOf(el) === -1) {
      continue;
    }
    const c = freq.get(el);
    const has = c !== undefined;

    if (has) {
      freq.set(el, c + 1);
    } else {
      freq.set(el, 1);
    }
  }

  // array of element - count
  const entries = [...freq.entries()];
  entries.sort((a, b) => b[1] - a[1]);
  return entries.map((x) => x[0]);
}

function middle(update: Update): number {
  const i = Math.floor(update.length / 2);
  return update[i];
}

function sol1(): number {
  let sum = 0;

  for (const update of updates) {
    if (isCorrect(update)) {
      sum += middle(update);
    }
  }

  return sum;
}

function sol2(): number {
  let sum = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];

    if (!isCorrect(update)) {
      const corrected = order(update);
      sum += middle(corrected);
    }
  }

  return sum;
}

export default defineAocModule({
  day: 5,
  exp1: 6505,
  exp2: 6897,
  sol1,
  sol2,
});
