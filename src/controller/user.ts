export const signup = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bodyData.value.password;

  if (email && password) {
  }

  context.response.body = {
    message: "signup",
  };
};

export const login = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bodyData.value.password;

  if (email && password) {
  }

  context.response.body = {
    message: "login",
  };
};

export const getAllUser = async (context: any) => {
  context.response.body = {
    message: "get all user",
    users: [],
  };
};
