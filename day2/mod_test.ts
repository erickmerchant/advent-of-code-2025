import { assertEquals } from "@std/assert";
import { part1, part2 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
  `;

  assertEquals(await part1(example), 1227775554);
  assertEquals(await part2(example), 4174379265);
});
