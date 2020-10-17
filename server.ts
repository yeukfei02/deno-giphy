import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Snelm } from "https://deno.land/x/snelm/mod.ts";
import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";

import mainRouter from "./src/routes/main.ts";
import userRouter from "./src/routes/user.ts";
import gifRouter from "./src/routes/gif.ts";
import stickerRouter from "./src/routes/sticker.ts";

const app = new Application();

const snelm = new Snelm("oak");

// middleware
app.use(oakCors());
app.use(async (ctx: Context, next: any) => {
  ctx.response = snelm.snelm(ctx.request, ctx.response);
  await next();
});
app.use(organ());

// main routes
app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

// user routes
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// gif routes
app.use(gifRouter.routes());
app.use(gifRouter.allowedMethods());

// sticker routes
app.use(stickerRouter.routes());
app.use(stickerRouter.allowedMethods());

console.log(`server is running at port 3000`);
await app.listen({ port: 3000 });
