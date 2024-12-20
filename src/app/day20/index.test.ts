import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day20/sample.txt");

describe.only("day20 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
