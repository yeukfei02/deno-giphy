import { getDatabase } from "../db/db.ts";

const db = getDatabase();
const users = db.collection("users");

export const signupModel = async (email: string, password: string) => {
  let result = null;

  if (email && password) {
    result = await users.insertOne({
      email: email,
      password: password,
    });
  }

  return result;
};

export const getUserByEmailModel = async (email: string) => {
  let result = null;

  if (email) {
    const user = await users.findOne({ email: email });
    if (user) {
      result = user;
    }
  }

  return result;
};

export const getAllUserModel = async () => {
  const result = await users.find({});
  return result;
};
