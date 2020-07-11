import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import mainRouter from "./src/routes/main.ts";
import userRouter from "./src/routes/user.ts";
import gifRouter from "./src/routes/gif.ts";
import stickerRouter from "./src/routes/sticker.ts";

const app = new Application();

// logger
app.use(async (ctx: Context, next: any) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// request timing
app.use(async (ctx: Context, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(oakCors());

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
