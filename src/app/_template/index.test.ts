import { readLines } from "@/lib";
import { expect, test, describe } from "bun:test";

const lines: string[] = readLines("_template/sample.txt");

describe.only("day00 tests", () => {
  test("sample line length", () => {
    expect(lines.length).toBe(1);
  });
});
