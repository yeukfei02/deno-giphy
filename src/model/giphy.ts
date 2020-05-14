import { getDatabase } from "../db/db.ts";

const db = getDatabase();
const gifs = db.collection("gifs");
const trendingGifs = db.collection("trendingGifs");
const randomGifs = db.collection("randomGifs");

export const addGifsModel = async () => {
  let result = "";

  result = await gifs.insertOne({});

  return result;
};

export const addTrendingGifModel = async () => {
  let result = "";

  result = await trendingGifs.insertOne({});

  return result;
};

export const addTrendingGifsModel = async () => {
  let result = "";

  result = await randomGifs.insertOne({});

  return result;
};
