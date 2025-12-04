import { assertSnapshot } from "@std/testing/snapshot";
import { main } from "./main.ts";

Deno.test(async function main_test(t) {
  await assertSnapshot(t, await Array.fromAsync(main()));
});
