export const checkUserLogin = async (context: any) => {
  let status = false;

  const tokenStr = context.request.headers.get("authorization");
  if (tokenStr) {
    const token = tokenStr.substring(7).trim();
    if (token) {
      status = true;
    }  
  }

  return status;
}
