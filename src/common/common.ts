import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

export const checkUserLogin = async (context: any) => {
  let status = false;

  const tokenStr = context.request.headers.get("authorization");
  if (tokenStr) {
    const token = tokenStr.substring(7).trim();
    if (token) {
      const key = config().JWT_SECRET;
      const valid = await validateJwt(token, key);
      if (valid) {
        status = true;
      }
    }
  }

  return status;
};
