import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  searchSticker,
  getTrendingSticker,
  getRandomSticker,
} from "../controller/sticker.ts";

const router = new Router();
router.get("/api/giphy/search-sticker", searchSticker);
router.get("/api/giphy/get-trending-sticker", getTrendingSticker);
router.get("/api/giphy/get-random-sticker", getRandomSticker);

export default router;
