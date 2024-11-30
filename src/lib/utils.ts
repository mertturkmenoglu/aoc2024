import fs from "fs";

export function isNumberString(s: string): boolean {
  return !isNaN(parseFloat(s));
}

export function readLines(path: string, relative: boolean = true): string[] {
  const base = "src/app/";
  const truePath = relative ? base + path : path;
  return fs.readFileSync(truePath).toString().split("\n");
}

export function formatTime(t: number): string {
  return `${t.toFixed(4)} milliseconds`;
}
