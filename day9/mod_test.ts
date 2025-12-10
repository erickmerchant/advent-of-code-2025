import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    7,1
    11,1
    11,7
    9,7
    9,5
    2,5
    2,3
    7,3
  `;

  assertEquals(await part1(example), 50);
  assertEquals(await part2(example), 24);
});
