import { Router } from "https://deno.land/x/oak/mod.ts";

import { createUser, getAllUser } from '../controller/user.ts';

const router = new Router();
router.post("/api/user/create-user", createUser);
router.get("/api/user", getAllUser);

export default router;
