import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    987654321111111
    811111111111119
    234234234234278
    818181911112111
  `;

  assertEquals(await part1(example), 357);
  assertEquals(await part2(example), 3121910778619);
});
