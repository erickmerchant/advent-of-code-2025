import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    123 328  51 64
     45 64  387 23
      6 98  215 314
    *   +   *   +
  `;

  assertEquals(await part1(example), 4277556);
  assertEquals(await part2(example), 3263827);
});
