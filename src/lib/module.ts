export type AocModule = {
  day: number;
  exp1: number;
  exp2: number;
  sol1: () => number;
  sol2: () => number;
};

export function defineAocModule(def: AocModule): AocModule {
  return def;
}
