import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import mainRouter from "./src/routes/main.ts";
import userRouter from "./src/routes/user.ts";
import giphyRouter from "./src/routes/giphy.ts";

const app = new Application();

// logger
app.use(async (context: any, next: any) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(`${context.request.method} ${context.request.url} - ${rt}`);
});

// request timing
app.use(async (context: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});

// cors
app.use(oakCors());

// main routes
app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

// user routes
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// giphy routes
app.use(giphyRouter.routes());
app.use(giphyRouter.allowedMethods());

console.log(`server is running at port 3000`);
await app.listen({ port: 3000 });
