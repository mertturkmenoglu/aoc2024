import module from "@/app/day22";
import { formatTime, measure } from "@/lib";

function main() {
  const [res1, dur1] = measure(module.sol1);
  const [res2, dur2] = measure(module.sol2);

  console.info("Day:", module.day);
  console.table([
    {
      name: "Solution 1",
      result: res1,
      expected: module.exp1,
      duration: formatTime(dur1),
      correct: res1 === module.exp1,
    },
    {
      name: "Solution 2",
      result: res2,
      expected: module.exp2,
      duration: formatTime(dur2),
      correct: res2 === module.exp2,
    },
  ]);
}

main();
