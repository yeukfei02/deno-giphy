import { Router } from "https://deno.land/x/oak/mod.ts";

import * as userController from "../controller/user.ts";

const router = new Router();
router.post("/api/user/signup", userController.signup);
router.post("/api/user/login", userController.login);
router.get("/api/user", userController.getAllUser);

export default router;
