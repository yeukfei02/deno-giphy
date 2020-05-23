import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";

export const searchStickerTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
    q: "hong kong",
  };
  const response = await giphy.searchSticker(params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};

export const getTrendingStickerTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.searchTrendingSticker(params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};

export const getRandomStickerTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.randomSticker(params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};
