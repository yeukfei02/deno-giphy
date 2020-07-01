import { Router } from "https://deno.land/x/oak/mod.ts";

import * as gifController from "../controller/gif.ts";

import { isUserLoggedIn } from "../middleware/middleware.ts";

const router = new Router();
router.get("/api/giphy/search-gif", isUserLoggedIn, gifController.searchGif);
router.get(
  "/api/giphy/get-trending-gif",
  isUserLoggedIn,
  gifController.getTrendingGif,
);
router.get(
  "/api/giphy/get-random-gif",
  isUserLoggedIn,
  gifController.getRandomGif,
);
router.get("/api/giphy/gif/:id", isUserLoggedIn, gifController.getGifById);

export default router;
