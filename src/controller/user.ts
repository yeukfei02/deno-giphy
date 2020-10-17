import { Context } from "https://deno.land/x/oak/mod.ts";
import {
  Jose,
  makeJwt,
  Payload,
  setExpiration,
} from "https://deno.land/x/djwt@v1.7/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {
  getAllUserModel,
  getUserByEmailModel,
  signupModel,
} from "../model/user.ts";

export const signup = async (ctx: Context) => {
  const bodyData = await ctx.request.body();
  const reqBody = await bodyData.value;
  const email = reqBody.email;
  const password = bcrypt.hashSync(reqBody.password);

  if (email && password) {
    const user = await getUserByEmailModel(email);
    if (!user) {
      const result = await signupModel(email, password);
      if (result) {
        ctx.response.status = 200;
        ctx.response.body = {
          message: "signup",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        message: "signup error, email already exists",
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "signup error, email and password cannot be empty",
    };
  }
};

export const login = async (ctx: Context) => {
  const bodyData = await ctx.request.body();
  const reqBody = await bodyData.value;
  const email = reqBody.email;
  const password = reqBody.password;

  if (email && password) {
    const user = await getUserByEmailModel(email);
    if (user) {
      const hashedPasswordFromDB = user.password;
      const comparePasswordStatus = bcrypt.compareSync(
        password,
        hashedPasswordFromDB,
      );
      if (comparePasswordStatus) {
        const token = await getToken(email, password);

        ctx.response.status = 200;
        ctx.response.body = {
          message: "login",
          token: token,
        };
      } else {
        ctx.response.status = 400;
        ctx.response.body = {
          message: "login error, password is not correct",
        };
      }
    } else {
      ctx.response.status = 400;
      ctx.response.body = {
        message: "login error, user not found",
      };
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "login error, email and password cannot be empty",
    };
  }
};

export const getAllUser = async (ctx: Context) => {
  let resultList: any[] = [];

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

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get all user",
    users: resultList,
  };
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
