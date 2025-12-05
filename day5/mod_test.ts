import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    3-5
    10-14
    16-20
    12-18

    1
    5
    8
    11
    17
    32
  `;

  assertEquals(await part1(example), 3);
  assertEquals(await part2(example), 14);
});
