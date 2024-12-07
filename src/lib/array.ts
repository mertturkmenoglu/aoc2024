/**
 * Create an array with length `n` and fill with `0`.
 * @param n is the array length.
 * @returns n-length zero array.
 */
export function zeros(n: number): number[] {
  return new Array(n).fill(n);
}

/**
 * Returns an array of indices.
 *
 * Starts from `0`, goes up to `n` (not included).
 * @param n is the array length.
 * @returns indices
 */
export function indices(n: number): number[] {
  return [...new Array(n).keys()];
}