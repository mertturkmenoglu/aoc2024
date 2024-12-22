export type AocModule = {
  day: number;
  exp1: number | string | bigint;
  exp2: number | string | bigint;
  sol1: () => number | string | bigint;
  sol2: () => number | string | bigint;
};

export function defineAocModule(def: AocModule): AocModule {
  return def;
}
