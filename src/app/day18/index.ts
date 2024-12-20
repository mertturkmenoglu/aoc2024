import { defineAocModule, Mtr, nums, readLines, type Pos, Arr, Graph } from "@/lib";

let [B, g] = [readLines("day18/input.txt").map((x) => nums(x).toReversed() as Pos), Mtr.createMtr([71, 71], ".")];

let fill = (n: number) => {
  g = Mtr.createMtr([71, 71], ".");
  Arr.range(0, n).forEach((i) => Mtr.set(g, B[i], "#"));
};

function sol1(): number {
  fill(1024);
  return Graph.bfs(g, [0, 0], [70, 70]).length - 1;
}

function sol2(lo = 0, hi = B.length): string {
  fill(2024);

  while (lo < hi) {
    let m = Math.floor(lo + (hi - lo) / 2);
    fill(m);

    if (Graph.bfs(g, [0, 0], [70, 70]).length === 0) hi = m;
    else lo = m + 1;
  }

  return `${B[lo - 1][1]},${B[lo - 1][0]}`;
}

export default defineAocModule({
  day: 18,
  exp1: 320,
  exp2: "34,40",
  sol1,
  sol2,
});
