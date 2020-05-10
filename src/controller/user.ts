
export const createUser = async (context: any) => {
  const bodyData = await context.request.body();
  const email = bodyData.value.email;
  const password = bodyData.value.password;

  console.log("email = ", email);
  console.log("password = ", password);

  context.response.body = {
    message: 'create user',
    users: []
  };
}

export const getAllUser = async (context: any) => {
  context.response.body = {
    message: 'get all user',
    users: []
  };
}
