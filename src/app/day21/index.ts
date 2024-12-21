// COULDN'T SOLVE IT
// TODO: Current BFS only returns 1 path
// But there could be more than one equally valid path that could produce a shorter path
// for the other keypad but I'm not checking that.
// Implementing this would that time, I don't have it.
// Maybe later.
import { defineAocModule, Graph, Mtr, posEq, posSub, readLines, sum, type Pos } from "@/lib";

const lines: string[] = readLines("day21/sample.txt");
let numKeypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["#", "0", "A"],
];

let dirKeypad = [
  ["#", "^", "A"],
  ["<", "v", ">"],
];

function complexity(code: string, path: string): number {
  return +code.slice(0, -1) * path.length;
}

function compute1(): number {
  return sum(lines.map((line) => complexity(line, calcPath(line))));
}

function calcPath(code: string): string {
  let codes = code.split("");
  let currPos: Pos = [3, 2];
  let walk: Pos[][] = [];
  for (let i = 0; i < codes.length; i++) {
    let nextPos = Mtr.find(numKeypad, codes[i])!;
    let path = [...Graph.bfs(numKeypad, currPos, nextPos)];
    currPos = nextPos;
    walk.push(path);
  }

  let dirwalk: string[] = [];
  for (let w of walk) {
    for (let i = 0; i < w.length - 1; i++) {
      let curr = w[i];
      let next = w[i + 1];
      let diff = posSub(curr, next);
      if (posEq(diff, [0, 1])) {
        dirwalk.push("<");
      } else if (posEq(diff, [1, 0])) {
        dirwalk.push("^");
        dirwalk.push(">");
      } else if (posEq(diff, [-1, 0])) {
        dirwalk.push("v");
      }
    }
    dirwalk.push("A");
  }

  currPos = [0, 2];
  walk = [];

  for (let i = 0; i < dirwalk.length; i++) {
    let nextPos = Mtr.find(dirKeypad, dirwalk[i])!;
    let path = [...Graph.bfs(dirKeypad, currPos, nextPos)];
    currPos = nextPos;
    walk.push(path);
  }
  let d2walk: string[] = [];
  for (let w of walk) {
    for (let i = 0; i < w.length - 1; i++) {
      let curr = w[i];
      let next = w[i + 1];
      let diff = posSub(curr, next);
      if (posEq(diff, [0, 1])) {
        d2walk.push("<");
      } else if (posEq(diff, [1, 0])) {
        d2walk.push("^");
      } else if (posEq(diff, [0, -1])) {
        d2walk.push(">");
      } else if (posEq(diff, [-1, 0])) {
        d2walk.push("v");
      }
    }
    d2walk.push("A");
  }

  currPos = [0, 2];
  walk = [];

  for (let i = 0; i < d2walk.length; i++) {
    let nextPos = Mtr.find(dirKeypad, d2walk[i])!;
    let path = [...Graph.bfs(dirKeypad, currPos, nextPos)];
    currPos = nextPos;
    walk.push(path);
  }
  let d3walk: string[] = [];
  for (let w of walk) {
    for (let i = 0; i < w.length - 1; i++) {
      let curr = w[i];
      let next = w[i + 1];
      let diff = posSub(curr, next);
      if (posEq(diff, [0, 1])) {
        d3walk.push("<");
      } else if (posEq(diff, [1, 0])) {
        d3walk.push("^");
      } else if (posEq(diff, [0, -1])) {
        d3walk.push(">");
      } else if (posEq(diff, [-1, 0])) {
        d3walk.push("v");
      }
    }
    d3walk.push("A");
  }

  return d3walk.join("");
}

function sol1(): number {
  return compute1();
}

function sol2(): number {
  return 0;
}

export default defineAocModule({
  day: 21,
  exp1: 0,
  exp2: 0,
  sol1,
  sol2,
});
