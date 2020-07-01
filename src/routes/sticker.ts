import { Router } from "https://deno.land/x/oak/mod.ts";

import * as stickerController from "../controller/sticker.ts";

import { isUserLoggedIn } from "../middleware/middleware.ts";

const router = new Router();
router.get(
  "/api/giphy/search-sticker",
  isUserLoggedIn,
  stickerController.searchSticker,
);
router.get(
  "/api/giphy/get-trending-sticker",
  isUserLoggedIn,
  stickerController.getTrendingSticker,
);
router.get(
  "/api/giphy/get-random-sticker",
  isUserLoggedIn,
  stickerController.getRandomSticker,
);

export default router;
