import { Router } from "https://deno.land/x/oak/mod.ts";

import { searchGif, getTrendingGif, getRandomGif, getGifFromId } from '../controller/giphy.ts';

const router = new Router();
router.get("/api/giphy/search-gif", searchGif);
router.get("/api/giphy/get-trending-gif", getTrendingGif);
router.get("/api/giphy/get-random-gif", getRandomGif);
router.get("/api/giphy/:id", getGifFromId);

export default router;
