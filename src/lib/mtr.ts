import type { Pos, Matrix } from "./types";

/**
 * Create a new matrix.
 * @param p is the dimensions of the matrix `[row, col]`
 * @param fill is the initial value for every matrix cell.
 * @returns an `r x c` matrix
 */
export function createMtr<T>([r, c]: Pos, fill: T): Matrix<T> {
  return new Array(r).fill(0).map(() => new Array(c).fill(fill));
}

/**
 * Returns the 0 indexed `i`-th row.
 * @param m is the matrix
 * @param i is the row index
 * @returns the row
 */
export function row<T>(m: Matrix<T>, i: number): T[] {
  return m[i];
}

/**
 * Return the 0 indexed `i`-th column.
 * @param m is the matrix
 * @param i is the column index.
 * @returns the column.
 */
export function col<T>(m: Matrix<T>, i: number): T[] {
  return m.map((r) => r[i]);
}

/**
 * Return the value at position `p`.
 *
 * Doesn't check boundaries.
 * @param m is the matrix
 * @param p is the position
 * @returns the value at the position `p`
 */
export function at<T>(m: Matrix<T>, [r, c]: Pos): T {
  return m[r][c];
}

/**
 * Return the value at position `p` or `undefined`.
 *
 * Checks boundaries.
 * @param m is the matrix
 * @param p is the position
 * @returns the value at the position `p` or `undefined`
 */
export function $at<T>(m: Matrix<T>, [r, c]: Pos): T | undefined {
  return m[r]?.[c];
}

/**
 * Set the position `p` with the value `v` for a given matrix `m`.
 * @param m is the matrix
 * @param p is the position
 * @param v is the new value
 */
export function set<T>(m: Matrix<T>, [r, c]: Pos, v: T): void {
  m[r][c] = v;
}

/**
 * Get the row and column as a tuple
 * @param m is the matrix
 * @returns row and column counts as a tuple
 */
export function dims<T>(m: Matrix<T>): Pos {
  return [m.length, m[0].length];
}

/**
 * Check if the given position `p` is inside the matrix boundaries.
 * @param m is the matrix
 * @param p is the position
 * @returns if position is inside the matrix
 */
export function isOnGrid<T>(m: Matrix<T>, [r, c]: Pos): boolean {
  const [rc, cc] = dims(m);
  return !(r < 0 || c < 0 || r >= rc || c >= cc);
}

/**
 * Try to find the position [row, col] of value `v` on the matrix `m`
 * @param m is the matrix
 * @param v is the value to search
 * @returns `Pos` if value is on the matrix, else `null`
 */
export function find<T>(m: Matrix<T>, v: T): Pos | null {
  const [r, c] = dims(m);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (m[i][j] === v) {
        return [i, j];
      }
    }
  }

  return null;
}

/**
 * Check if the given value `v` is on the matrix `m`
 * @param m is the matrix
 * @param v is the value to search
 * @returns if value is on the matrix
 */
export function isValueOnGrid<T>(m: Matrix<T>, v: T): boolean {
  return find(m, v) !== null;
}

/**
 * Stringify a matrix
 * @param m is the matrix
 * @returns the serialized representation
 */
export function str<T>(m: Matrix<T>): string {
  return JSON.stringify(m);
}

/**
 * Check if two matrices are equal.
 * @param m1 first matrix
 * @param m2 second matrix
 * @returns if equal
 */
export function eq<T>(m1: Matrix<T>, m2: Matrix<T>): boolean {
  return str(m1) === str(m2);
}

/**
 * Returns the transpose of a matrix.
 * @param m is the matrix - M x N
 * @returns transposed matrix - N x M
 */
export function transpose<T>(m: Matrix<T>): Matrix<T> {
  const [r, c] = dims(m);
  const res = createMtr([c, r], m[0][0]);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res[j][i] = m[i][j];
    }
  }

  return res;
}

/**
 * Create an identity matrix
 * @param n matrix size
 * @returns an identity matrix
 */
export function identity(n: number): Matrix<number> {
  const m = createMtr([n, n], 0);

  for (let i = 0; i < n; i++) {
    m[i][i] = 1;
  }

  return m;
}

/**
 * Rotates a matrix 90 degrees clockwise.
 * @param m is the matrix - M x N
 * @returns returns a new matrix - N x M
 */
export function rotateCW<T>(m: Matrix<T>): Matrix<T> {
  const [r, c] = dims(m);
  const res = createMtr([c, r], m[0][0]);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res[j][r - i - 1] = m[i][j];
    }
  }

  return res;
}

/**
 * Rotates a matrix 90 degrees counterclockwise.
 * @param m is the matrix - M x N
 * @returns returns a new matrix - N x M
 */
export function rotateCCW<T>(m: Matrix<T>): Matrix<T> {
  const [r, c] = dims(m);
  const res = createMtr([c, r], m[0][0]);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res[r - j - 1][i] = m[i][j];
    }
  }

  return res;
}

/**
 * Reverse around X axis.
 *
 * Each row becomes reversed.
 * @param m is the matrix
 * @returns modified matrix
 */
export function revX<T>(m: Matrix<T>): Matrix<T> {
  const [r, c] = dims(m);
  const res = createMtr([r, c], m[0][0]);

  for (let j = 0; j < c; j++) {
    for (let i = 0; i < r / 2; i++) {
      res[i][j] = m[r - i - 1][j];
      res[r - i - 1][j] = m[i][j];
    }
  }

  return res;
}

/**
 * Reverse around Y axis.
 *
 * Each row becomes reversed.
 * @param m is the matrix
 * @returns modified matrix
 */
export function revY<T>(m: Matrix<T>): Matrix<T> {
  const [r, c] = dims(m);
  const res = createMtr([r, c], m[0][0]);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c / 2; j++) {
      [res[i][j], res[i][c - j - 1]] = [m[i][c - j - 1], m[i][j]];
    }
  }

  return res;
}

export function mapCell<T, V>(m: Matrix<T>, fn: (v: T, i: number, j: number) => V): V[] {
  const [r, c] = dims(m);
  const res: V[] = [];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      res.push(fn(m[i][j], i, j));
    }
  }

  return res;
}

export function forEachCell<T>(m: Matrix<T>, fn: (v: T, i: number, j: number) => void): void {
  const [r, c] = dims(m);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      fn(m[i][j], i, j);
    }
  }
}
