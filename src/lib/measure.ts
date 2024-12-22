type Result = number | string | bigint;

type Duration = number;

export function measure(fn: () => Result): [Result, Duration] {
  const start = performance.now();
  const res = fn();
  const end = performance.now();
  return [res, end - start];
}
