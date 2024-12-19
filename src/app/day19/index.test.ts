import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day19/sample.txt");

describe.only("day19 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
