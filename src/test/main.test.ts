import { assert } from "https://deno.land/std/testing/asserts.ts";
import { signupTest, loginTest, getAllUserTest } from "./user.ts";
import {
  searchGifTest,
  getTrendingGifTest,
  getRandomGifTest,
  getGifByIdTest,
} from "./gif.ts";
import {
  searchStickerTest,
  getTrendingStickerTest,
  getRandomStickerTest,
} from "./sticker.ts";

Deno.test("signup", async () => {
  const result = await signupTest();
  assert(result);
});

Deno.test("login", async () => {
  const result = await loginTest();
  assert(result);
});

Deno.test("getAllUser", async () => {
  const result = await getAllUserTest();
  assert(result);
});

Deno.test("searchGif", async () => {
  const result = await searchGifTest();
  assert(result);
});

Deno.test("getTrendingGif", async () => {
  const result = await getTrendingGifTest();
  assert(result);
});

Deno.test("getRandomGif", async () => {
  const result = await getRandomGifTest();
  assert(result);
});

Deno.test("getGifById", async () => {
  const result = await getGifByIdTest();
  assert(result);
});

Deno.test("searchSticker", async () => {
  const result = await searchStickerTest();
  assert(result);
});

Deno.test("getTrendingSticker", async () => {
  const result = await getTrendingStickerTest();
  assert(result);
});

Deno.test("getRandomSticker", async () => {
  const result = await getRandomStickerTest();
  assert(result);
});
