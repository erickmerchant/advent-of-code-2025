import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    ..@@.@@@@.
    @@@.@.@.@@
    @@@@@.@.@@
    @.@@@@..@.
    @@.@@@@.@@
    .@@@@@@@.@
    .@.@.@.@@@
    @.@@@.@@@@
    .@@@@@@@@.
    @.@.@@@.@.
  `;

  assertEquals(await part1(example), 13);
  assertEquals(await part2(example), 43);
});
