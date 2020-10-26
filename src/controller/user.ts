import { Context } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { getToken } from "./../common/common.ts";
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
      const hashedPasswordFromDB = (user as any).password;
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
