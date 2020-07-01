import { Context } from "https://deno.land/x/oak/mod.ts";

export const getMain = async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = {
    message: "deno-giphy api",
  };
};
