import { Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";
import {
  addRandomStickersModel,
  addStickersModel,
  addTrendingStickersModel,
  getRandomStickerByIdModel,
  getStickerByIdModel,
  getTrendingStickerByIdModel,
} from "../model/sticker.ts";

export const searchSticker = async (ctx: Context) => {
  const keyword = ctx.request.url.searchParams.get("keyword");

  let responseJSON: any = null;

  if (keyword) {
    const params = {
      api_key: config().GIPHY_API_KEY,
      q: keyword,
    };
    const response = await giphy.searchSticker(params);
    if (response) {
      responseJSON = response;
      if (responseJSON) {
        for (let i = 0; i < responseJSON.data.length; i++) {
          const item = responseJSON.data[i];
          const id = item.id;
          const existingSticker = await getStickerByIdModel(id);
          if (!existingSticker) {
            await addStickersModel(item);
          }
        }
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "search sticker",
    result: responseJSON,
  };
};

export const getTrendingSticker = async (ctx: Context) => {
  let responseJSON: any = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.searchTrendingSticker(params);
  if (response) {
    responseJSON = response;
    if (responseJSON) {
      for (let i = 0; i < responseJSON.data.length; i++) {
        const item = responseJSON.data[i];
        const id = item.id;
        const existingTrendingSticker = await getTrendingStickerByIdModel(id);
        if (!existingTrendingSticker) {
          await addTrendingStickersModel(item);
        }
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get trending sticker",
    result: responseJSON,
  };
};

export const getRandomSticker = async (ctx: Context) => {
  let responseJSON: any = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.randomSticker(params);
  if (response) {
    responseJSON = response;
    if (responseJSON) {
      const id = responseJSON.data.id;
      const existingRandomSticker = await getRandomStickerByIdModel(id);
      if (!existingRandomSticker) {
        await addRandomStickersModel(responseJSON.data);
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get random sticker",
    result: responseJSON,
  };
};
