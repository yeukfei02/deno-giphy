import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

export const isUserLoggedIn = async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  try {
    const tokenStr = ctx.request.headers.get("authorization");
    if (tokenStr) {
      const token = tokenStr.substring(7).trim();
      if (token) {
        const key = config().JWT_SECRET;
        const valid = await validateJwt(token, key);
        if (valid) {
          await next();
        }
      }
    }
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: `error = ${e.message}`,
    };
  }
};
