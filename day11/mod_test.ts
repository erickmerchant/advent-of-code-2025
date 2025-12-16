import { assertEquals } from "@std/assert";
import { part1 } from "./mod.ts";

Deno.test(async function mod_test() {
  const example1 = `
    aaa: you hhh
    you: bbb ccc
    bbb: ddd eee
    ccc: ddd eee fff
    ddd: ggg
    eee: out
    fff: out
    ggg: out
    hhh: ccc fff iii
    iii: out
  `;

  const _example2 = `
    svr: aaa bbb
    aaa: fft
    fft: ccc
    bbb: tty
    tty: ccc
    ccc: ddd eee
    ddd: hub
    hub: fff
    eee: dac
    dac: fff
    fff: ggg hhh
    ggg: out
    hhh: out
  `;

  assertEquals(await part1(example1), 5);
  // assertEquals(await part2(example2), 2);
});
