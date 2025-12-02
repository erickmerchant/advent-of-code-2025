import { assertEquals } from "@std/assert";
import { day1_part1, day1_part2, day2_part1, day2_part2 } from "./main.ts";

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

Deno.test(async function day2() {
  const example = `
    11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
  `;

  assertEquals(await day2_part1(example), 1227775554);
  assertEquals(await day2_part2(example), 4174379265);
});
