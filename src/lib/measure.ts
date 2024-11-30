type Result = number;

type Duration = number;

export function measure(fn: () => number): [Result, Duration] {
  const start = performance.now();
  const res = fn();
  const end = performance.now();
  return [res, end - start];
}
