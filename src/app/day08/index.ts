import { defineAocModule, posAdd, posSub, readLines, type Pos } from "@/lib";
import { Mtr } from "@/lib";

const lines: string[] = readLines("day08/input.txt");
const m: string[][] = lines.map((l) => l.split(""));

type PosString = string;

const Key = JSON.stringify;

function findAntennas(): Map<string, Pos[]> {
  const antennas = new Map<string, Pos[]>();
  const [r, c] = Mtr.dims(m);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let ch = Mtr.at(m, [i, j]);
      if (ch !== ".") {
        const arr = antennas.get(ch);
        const has = arr !== undefined;
        antennas.set(ch, has ? [...arr, [i, j]] : [[i, j]]);
      }
    }
  }

  return antennas;
}

function compute2(sol1: boolean): number {
  const antinodes = new Set<PosString>();
  const antennas = findAntennas();

  for (const [_, positions] of antennas) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a1 = positions[i];
        const a2 = positions[j];
        const [rowDiff, colDiff] = posSub(a1, a2);

        let ii = sol1 ? 1 : 0;
        let an1 = posAdd(a1, [ii * rowDiff, ii * colDiff]);
        while (Mtr.isOnGrid(m, an1)) {
          antinodes.add(Key(an1));
          if (sol1) {
            break;
          }
          ii++;
          an1 = posAdd(a1, [ii * rowDiff, ii * colDiff]);
        }

        ii = sol1 ? 1 : 0;
        let an2 = posAdd(a2, [-ii * rowDiff, -ii * colDiff]);
        while (Mtr.isOnGrid(m, an2)) {
          antinodes.add(Key(an2));
          if (sol1) {
            break;
          }
          ii++;
          an2 = posAdd(a2, [-ii * rowDiff, -ii * colDiff]);
        }
      }
    }
  }

  return antinodes.size;
}

function sol1(): number {
  return compute2(true);
}

function sol2(): number {
  return compute2(false);
}

export default defineAocModule({
  day: 8,
  exp1: 249,
  exp2: 905,
  sol1,
  sol2,
});
