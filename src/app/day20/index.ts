import { defineAocModule, Mtr, readLines, Graph } from "@/lib";

let g = readLines("day20/input.txt").map((x) => x.split(""));
let [start, end] = [Mtr.find(g, "S")!, Mtr.find(g, "E")!];
let path = Graph.bfs(g, start, end);

function compute1(s1 = true): number {
  let sum = 0;
  for (let i = 0; i < path.length; i++) {
    for (let j = i + 102; j < path.length; j++) {
      let dist = Math.abs(path[j][0] - path[i][0]) + Math.abs(path[j][1] - path[i][1]);
      if ((s1 && dist === 2) || (!s1 && dist <= 20 && j - i - dist >= 100)) {
        sum++;
      }
    }
  }
  return sum;
}

export default defineAocModule({
  day: 20,
  exp1: 1286,
  exp2: 989_316,
  sol1: () => compute1(),
  sol2: () => compute1(false),
});
