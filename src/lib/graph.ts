import { Graph, Mtr, type BfsNode } from ".";
import type { Matrix, Pos } from "./types";
import { cardinalCoefs, posAdd, posEq } from "./utils";

export function getCardinalNeighbours(pos: Pos): Pos[] {
  return cardinalCoefs.map((c) => posAdd(pos, c));
}

export function n4<T>(g: Matrix<T>, node: Graph.N): Pos[] {
  return getCardinalNeighbours(node.value).filter((x) => Mtr.isOnGrid(g, x) && Mtr.at(g, x) !== "#");
}

export function path(end: N | null): Pos[] {
  let tmp = end;
  let path: Pos[] = [];

  while (tmp !== null) {
    path.push(tmp.value);
    tmp = tmp.parent;
  }

  return path.toReversed();
}

export function hasPos(arr: N[], p: Pos): boolean {
  return arr.some((x) => posEq(x.value, p));
}

export type N = BfsNode<Pos>;

export function bfs<T>(g: Matrix<T>, start: Pos, end: Pos): Pos[] {
  let open: N[] = [{ value: start, parent: null }];
  let seen: N[] = [];

  while (open.length > 0) {
    let q = open.shift()!;
    seen.push(q);

    if (posEq(q.value, end)) {
      return path(q);
    }

    for (let n of n4(g, q)) {
      if (hasPos(seen, n)) {
        continue;
      }

      if (hasPos(open, n)) {
        continue;
      }

      open.push({ value: n, parent: q });
    }
  }

  return [];
}
