import { assertEquals } from "@std/assert";
import { part1 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example = `
    0:
    ###
    ##.
    ##.

    1:
    ###
    ##.
    .##

    2:
    .##
    ###
    ##.

    3:
    ##.
    ###
    ##.

    4:
    ###
    #..
    ###

    5:
    ###
    .#.
    ###

    4x4: 0 0 0 0 2 0
    12x5: 1 0 1 0 2 2
    12x5: 1 0 1 0 3 2
  `;

  assertEquals(await part1(example), 2);
  // assertEquals(await part2(example2), 2);
});
