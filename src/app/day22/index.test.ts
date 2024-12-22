import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("day22/sample.txt");

describe.only("day22 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
