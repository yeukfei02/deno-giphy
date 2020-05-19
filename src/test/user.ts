import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
  signupModel,
  getUserByEmailModel,
  getAllUserModel,
} from "../model/user.ts";

const uuid = v4.generate();
const email = `${uuid}@test.com`;
const password = bcrypt.hashSync("test");

export const signupTest = async () => {
  let result = null;

  const user = await getUserByEmailModel(email);
  if (!user) {
    result = await signupModel(email, password);
  }

  return result;
};

export const loginTest = async () => {
  let token = "";

  const user = await getUserByEmailModel(email);
  if (user) {
    const hashedPasswordFromDB = password;
    const comparePasswordStatus = bcrypt.compareSync(
      "test",
      hashedPasswordFromDB,
    );
    if (comparePasswordStatus) {
      token = await getToken(email, password);
    }
  }

  return token;
};

export const getAllUserTest = async () => {
  let resultList = null;

  const usersList = await getAllUserModel();
  if (usersList) {
    resultList = usersList.map((item: any, i: number) => {
      const _id = item._id.$oid;

      const obj = {
        _id: _id,
        email: item.email,
        password: item.password,
      };
      return obj;
    });
  }

  return resultList;
};

async function getToken(email: string, password: string) {
  const key = config().JWT_SECRET;
  const currentDate = moment().format();
  const expireTimeMs = moment(currentDate).add(1, "days").valueOf();

  const payload: Payload = {
    email: email,
    password: password,
    exp: setExpiration(expireTimeMs),
  };
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };

  const token = makeJwt({ header, payload, key });
  return token;
}
