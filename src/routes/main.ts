import { Router } from "https://deno.land/x/oak/mod.ts";

import * as mainController from "../controller/main.ts";

const router = new Router();
router.get("/", mainController.getMain);

export default router;
