import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day24/sample.txt");

describe.only("day24 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
