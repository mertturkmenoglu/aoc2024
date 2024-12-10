export type BfsNode<T> = {
  value: T;
  parent: BfsNode<T> | null;
};
