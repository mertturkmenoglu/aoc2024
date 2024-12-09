import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day08/sample.txt");

describe("day08 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
