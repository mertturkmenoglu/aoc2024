import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day17/sample.txt");

describe("day17 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
