import { defineAocModule, readLines, type Pos } from "@/lib";
import { Mtr } from "@/lib";

const lines: string[] = readLines("day08/input.txt");
const m: string[][] = lines.map((l) => l.split(""));

type PosString = string;

function findAntennas(): Map<string, Pos[]> {
  const antennas = new Map<string, Pos[]>();
  const [r, c] = Mtr.dims(m);

  // Find antennas in the grid.
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let ch = Mtr.at(m, [i, j]);
      if (ch !== ".") {
        const arr = antennas.get(ch);
        const has = arr !== undefined;

        if (has) {
          antennas.set(ch, [...arr, [i, j]]);
        } else {
          antennas.set(ch, [[i, j]]);
        }
      }
    }
  }

  return antennas;
}

function compute(): number {
  const antinodes = new Set<PosString>();
  const antennas = findAntennas();

  for (const [_, positions] of antennas) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a1 = positions[i];
        const a2 = positions[j];
        const rowDiff = a1[0] - a2[0];
        const colDiff = a1[1] - a2[1];

        const antiNode1: Pos = [a1[0] + rowDiff, a1[1] + colDiff];
        const antiNode2: Pos = [a2[0] - rowDiff, a2[1] - colDiff];

        const b1 = Mtr.isOnGrid(m, antiNode1);
        const b2 = Mtr.isOnGrid(m, antiNode2);

        if (b1) {
          const key = JSON.stringify(antiNode1);
          antinodes.add(key);
        }

        if (b2) {
          const key = JSON.stringify(antiNode2);
          antinodes.add(key);
        }
      }
    }
  }

  return antinodes.size;
}

function compute2(): number {
  const antinodes = new Set<PosString>();
  const antennas = findAntennas();

  for (const [_, positions] of antennas) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a1 = positions[i];
        const a2 = positions[j];
        const rowDiff = a1[0] - a2[0];
        const colDiff = a1[1] - a2[1];

        let ii = 0;
        let an1: Pos = [a1[0] + ii * rowDiff, a1[1] + ii * colDiff];
        while (Mtr.isOnGrid(m, an1)) {
          const key = JSON.stringify(an1);
          antinodes.add(key);
          ii++;
          an1 = [a1[0] + ii * rowDiff, a1[1] + ii * colDiff];
        }

        ii = 0;
        let an2: Pos = [a2[0] - ii * rowDiff, a2[1] - ii * colDiff];
        while (Mtr.isOnGrid(m, an2)) {
          const key = JSON.stringify(an2);
          antinodes.add(key);
          ii++;
          an2 = [a2[0] - ii * rowDiff, a2[1] - ii * colDiff];
        }
      }
    }
  }

  return antinodes.size;
}

function sol1(): number {
  return compute();
}

function sol2(): number {
  return compute2();
}

export default defineAocModule({
  day: 8,
  exp1: 249,
  exp2: 905,
  sol1,
  sol2,
});
