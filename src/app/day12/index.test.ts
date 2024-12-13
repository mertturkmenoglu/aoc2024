import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day12/sample.txt");

describe("day12 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
