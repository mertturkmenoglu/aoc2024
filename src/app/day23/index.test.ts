import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day23/sample.txt");

describe("day23 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
