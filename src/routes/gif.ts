import { Router } from "https://deno.land/x/oak/mod.ts";

import * as gifController from "../controller/gif.ts";

const router = new Router();
router.get("/api/giphy/search-gif", gifController.searchGif);
router.get("/api/giphy/get-trending-gif", gifController.getTrendingGif);
router.get("/api/giphy/get-random-gif", gifController.getRandomGif);
router.get("/api/giphy/gif/:id", gifController.getGifById);

export default router;
