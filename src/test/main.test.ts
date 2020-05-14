import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("main.test", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
