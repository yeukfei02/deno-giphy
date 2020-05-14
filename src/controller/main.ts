export const getMain = async (context: any) => {
  context.response.status = 200;
  context.response.body = {
    message: "deno-giphy api",
  };
};
