import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    L68
    L30
    R48
    L5
    R60
    L55
    L1
    L99
    R14
    L82
  `;

  assertEquals(await part1(example), 3);
  assertEquals(await part2(example), 6);
});
