import { config } from "https://deno.land/x/dotenv/mod.ts";

const keyword = "hong kong";
let id = "";

export const searchGifTest = async () => {
  let responseJSON = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${config().GIPHY_API_KEY}&q=${keyword}`,
  );
  if (response) {
    responseJSON = await response.json();
    if (responseJSON && responseJSON.data) {
      id = responseJSON.data[0].id;
    }
  }

  return responseJSON;
};

export const getTrendingGifTest = async () => {
  let responseJSON = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${config().GIPHY_API_KEY}`,
  );
  if (response) {
    responseJSON = await response.json();
  }

  return responseJSON;
};

export const getRandomGifTest = async () => {
  let responseJSON = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${config().GIPHY_API_KEY}`,
  );
  if (response) {
    responseJSON = await response.json();
  }

  return responseJSON;
};

export const getGifByIdTest = async () => {
  let responseJSON = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${id}?api_key=${config().GIPHY_API_KEY}`,
  );
  if (response) {
    responseJSON = await response.json();
  }

  return responseJSON;
};
