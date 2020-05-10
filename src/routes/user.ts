import { Router } from "https://deno.land/x/oak/mod.ts";

import { signup, login, getAllUser } from "../controller/user.ts";

const router = new Router();
router.post("/api/user/signup", signup);
router.post("/api/user/login", login);
router.get("/api/user", getAllUser);

export default router;
