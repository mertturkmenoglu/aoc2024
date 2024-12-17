export type AocModule = {
  day: number;
  exp1: number | string;
  exp2: number | string;
  sol1: () => number | string;
  sol2: () => number | string;
};

export function defineAocModule(def: AocModule): AocModule {
  return def;
}
