import { defineAocModule, readLines, type Pos } from "@/lib";

const lines: string[] = readLines("day14/input.txt");
let X = 101;
let Y = 103;

function compute1() {
  let T = 100;
  let pos: Pos[] = [];
  for (let line of lines) {
    let [p, v] = line.split(" ");
    let [px, py] = p.slice(2).split(",").map(Number);
    let [vx, vy] = v.slice(2).split(",").map(Number);
    for (let s = 0; s < T; s++) {
      px += vx;
      if (px >= X) {
        px = px - X;
      }
      if (px < 0) {
        px = X + px;
      }

      py += vy;
      if (py >= Y) {
        py = py - Y;
      }
      if (py < 0) {
        py = Y + py;
      }
    }
    pos.push([px, py]);
  }

  const xm = Math.floor(X / 2);
  const ym = Math.floor(Y / 2);
  let [q1, q2, q3, q4] = [0, 0, 0, 0];

  for (let [r, c] of pos) {
    if (r < xm && c < ym) {
      q1++;
    } else if (r < xm && c > ym) {
      q2++;
    } else if (r > xm && c < ym) {
      q3++;
    } else if (r > xm && c > ym) {
      q4++;
    }
  }

  return q1 * q2 * q3 * q4;
}

function compute2() {
  let positions: Pos[] = [];
  let velocities: Pos[] = [];
  for (let line of lines) {
    let [p, v] = line.split(" ");
    let [px, py] = p.slice(2).split(",").map(Number);
    let [vx, vy] = v.slice(2).split(",").map(Number);
    positions.push([px, py]);
    velocities.push([vx, vy]);
  }

  let t = 0;

  while (true) {
    let distinct = new Set<string>(positions.map((x) => JSON.stringify(x)));

    if (distinct.size === positions.length) {
      break;
    }

    for (let i = 0; i < positions.length; i++) {
      let [px, py] = positions[i];
      let [vx, vy] = velocities[i];
      px += vx;
      if (px >= X) {
        px = px - X;
      }
      if (px < 0) {
        px = X + px;
      }

      py += vy;
      if (py >= Y) {
        py = py - Y;
      }
      if (py < 0) {
        py = Y + py;
      }
      positions[i] = [px, py];
    }

    t++;
  }
  return t;
}

function sol1(): number {
  return compute1();
}

function sol2(): number {
  return compute2();
}

export default defineAocModule({
  day: 14,
  exp1: 232_253_028,
  exp2: 8179,
  sol1,
  sol2,
});
