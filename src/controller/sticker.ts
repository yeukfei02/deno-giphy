import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";
import {
  addStickersModel,
  addTrendingStickersModel,
  addRandomStickersModel,
  getStickerByIdModel,
  getTrendingStickerByIdModel,
  getRandomStickerByIdModel,
} from "../model/sticker.ts";
import { checkUserLogin } from "../common/common.ts";

export const searchSticker = async (context: any) => {
  const urlSearchParams = new URLSearchParams(context.request.url.searchParams);
  const keyword = urlSearchParams.get("keyword");

  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "search sticker",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getTrendingSticker = async (context: any) => {
  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "get trending sticker",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getRandomSticker = async (context: any) => {
  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "get random sticker",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};
