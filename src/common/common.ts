import {
  Jose,
  makeJwt,
  Payload,
  setExpiration,
} from "https://deno.land/x/djwt@v1.7/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import moment from "https://cdn.skypack.dev/moment";

export const getToken = async (email: string, password: string) => {
  const currentDate = moment().format();
  const expireTimeMs = moment(currentDate).add(1, "days").valueOf();

  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload: Payload = {
    email: email,
    password: password,
    exp: setExpiration(expireTimeMs),
  };

  const key = config().JWT_SECRET;

  const token = makeJwt({ header, payload, key });
  return token;
};
