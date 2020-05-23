import { Router } from "https://deno.land/x/oak/mod.ts";

import * as stickerController from "../controller/sticker.ts";

const router = new Router();
router.get("/api/giphy/search-sticker", stickerController.searchSticker);
router.get(
  "/api/giphy/get-trending-sticker",
  stickerController.getTrendingSticker,
);
router.get("/api/giphy/get-random-sticker", stickerController.getRandomSticker);

export default router;
