type Result = number | string;

type Duration = number;

export function measure(fn: () => number | string): [Result, Duration] {
  const start = performance.now();
  const res = fn();
  const end = performance.now();
  return [res, end - start];
}
