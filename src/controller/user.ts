import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {
  signupModel,
  getUserByEmailModel,
  getAllUserModel,
} from "../model/user.ts";
import { checkUserLogin } from "../common/common.ts";

export const signup = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bcrypt.hashpw(bodyData.value.password);

  if (email && password) {
    const user = await getUserByEmailModel(email);
    if (!user) {
      const result = await signupModel(email, password);
      if (result) {
        context.response.status = 200;
        context.response.body = {
          message: "signup",
        };
      }
    } else {
      context.response.status = 400;
      context.response.body = {
        message: "signup error, email already exists",
      };
    }
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "signup error, email and password cannot be empty",
    };
  }
};

export const login = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bodyData.value.password;

  if (email && password) {
    const user = await getUserByEmailModel(email);
    if (user) {
      const hashedPasswordFromDB = user.password;
      const comparePasswordStatus = bcrypt.checkpw(
        password,
        hashedPasswordFromDB,
      );
      if (comparePasswordStatus) {
        const token = await getToken(email, password);

        context.response.status = 200;
        context.response.body = {
          message: "login",
          token: token,
        };
      } else {
        context.response.status = 400;
        context.response.body = {
          message: "login error, password is not correct",
        };
      }
    } else {
      context.response.status = 400;
      context.response.body = {
        message: "login error, user not found",
      };
    }
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "login error, email and password cannot be empty",
    };
  }
};

export const getAllUser = async (context: any) => {
  let resultList = [];

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "get all user",
      users: resultList,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
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
