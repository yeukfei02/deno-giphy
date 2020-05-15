import { getDatabase } from "../db/db.ts";

const db = getDatabase();
const gifs = db.collection("gifs");
const trendingGifs = db.collection("trendingGifs");
const randomGifs = db.collection("randomGifs");

export const addGifsModel = async (data: any[]) => {
  let result = "";

  if (data) {
    result = await gifs.insertMany(data);
  }

  return result;
};

export const addTrendingGifsModel = async (data: any[]) => {
  let result = "";

  if (data) {
    result = await trendingGifs.insertMany(data);
  }

  return result;
};

export const addRandomGifsModel = async (data: any) => {
  let result = "";

  if (data) {
    result = await randomGifs.insertOne(data);
  }

  return result;
};

export const getGifByIdModel = async (id: string) => {
  const result = await gifs.findOne({ id: id });
  return result;
};
