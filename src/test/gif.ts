import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";

let id = "";

export const searchGifTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
    q: "hong kong",
  };
  const response = await giphy.searchGif(params);
  if (response) {
    responseJSON = response;
    if (responseJSON && responseJSON.data) {
      id = responseJSON.data[0].id;
    }
  }

  return responseJSON;
};

export const getTrendingGifTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.searchTrendingGif(params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};

export const getRandomGifTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.randomGif(params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};

export const getGifByIdTest = async () => {
  let responseJSON = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.getGifById(id, params);
  if (response) {
    responseJSON = response;
  }

  return responseJSON;
};
