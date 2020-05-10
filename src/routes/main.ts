import { Router } from "https://deno.land/x/oak/mod.ts";

import { getMain } from "../controller/main.ts";

const router = new Router();
router.get("/", getMain);

export default router;
