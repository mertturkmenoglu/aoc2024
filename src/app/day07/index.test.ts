import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day07/sample.txt");

describe("day07 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(9);
  });
});
