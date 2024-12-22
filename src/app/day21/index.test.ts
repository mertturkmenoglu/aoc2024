import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day21/sample.txt");

describe("day21 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
