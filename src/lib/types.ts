/**
 * 2 dimensional array type alias.
 */
export type Matrix<T> = T[][];

/**
 * A type alias for a 1-tuple.
 */
export type Singleton<T> = [T];

/**
 * A type alias for a 2-tuple.
 *
 * It is short for "Ordered Pair"
 */
export type Pair<T, U> = [T, U];

/**
 * A 2-tuple to represent a position on a matrix/grid.
 *
 * It's a generic type alias for number 2-tuples.
 */
export type Pos = [number, number];
