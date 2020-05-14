import { signupModel, getUserByEmailModel, getAllUserModel } from '../model/user.ts';
import { checkUserLogin } from '../common/common.ts';

export const signup = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bodyData.value.password;

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
      if (user.password === password) {
        const token = "";

        context.response.status = 200;
        context.response.body = {
          message: "login",
          token: token
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
          password: item.password
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
      message: "missing bearer token",
    };
  }
};
