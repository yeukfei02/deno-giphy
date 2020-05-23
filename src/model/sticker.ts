import { getDatabase } from "../db/db.ts";

const db = getDatabase();
const stickers = db.collection("stickers");
const trendingStickers = db.collection("trendingStickers");
const randomStickers = db.collection("randomStickers");

export const addStickersModel = async (data: any) => {
  let result = "";

  if (data) {
    result = await stickers.insertOne(data);
  }

  return result;
};

export const addTrendingStickersModel = async (data: any) => {
  let result = "";

  if (data) {
    result = await trendingStickers.insertOne(data);
  }

  return result;
};

export const addRandomStickersModel = async (data: any) => {
  let result = "";

  if (data) {
    result = await randomStickers.insertOne(data);
  }

  return result;
};

export const getStickerByIdModel = async (id: string) => {
  const result = await stickers.findOne({ id: id });
  return result;
};

export const getTrendingStickerByIdModel = async (id: string) => {
  const result = await trendingStickers.findOne({ id: id });
  return result;
};

export const getRandomStickerByIdModel = async (id: string) => {
  const result = await randomStickers.findOne({ id: id });
  return result;
};
