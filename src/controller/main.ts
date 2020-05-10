export const getMain = async (context: any) => {
  context.response.body = {
    message: "deno-giphy api",
  };
};
