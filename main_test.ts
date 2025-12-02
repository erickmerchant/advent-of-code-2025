import { assertEquals } from "@std/assert";
import { day1_part1, day1_part2 } from "./main.ts";

Deno.test(async function day1() {
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

  assertEquals(await day1_part1(example), 3);
  assertEquals(await day1_part2(example), 6);
});
