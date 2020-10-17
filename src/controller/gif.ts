import { Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";
import {
  addGifsModel,
  addRandomGifsModel,
  addTrendingGifsModel,
  getGifByIdModel,
  getRandomGifByIdModel,
  getTrendingGifByIdModel,
} from "../model/gif.ts";

export const searchGif = async (ctx: Context) => {
  const keyword = ctx.request.url.searchParams.get("keyword");

  let responseJSON: any = null;

  if (keyword) {
    const params = {
      api_key: config().GIPHY_API_KEY,
      q: keyword,
    };
    const response = await giphy.searchGif(params);
    if (response) {
      responseJSON = response;
      if (responseJSON) {
        for (let i = 0; i < responseJSON.data.length; i++) {
          const item = responseJSON.data[i];
          const id = item.id;
          const existingGif = await getGifByIdModel(id);
          if (!existingGif) {
            await addGifsModel(item);
          }
        }
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "search gif",
    result: responseJSON,
  };
};

export const getTrendingGif = async (ctx: Context) => {
  let responseJSON: any = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.searchTrendingGif(params);
  if (response) {
    responseJSON = response;
    if (responseJSON) {
      for (let i = 0; i < responseJSON.data.length; i++) {
        const item = responseJSON.data[i];
        const id = item.id;
        const existingTrendingGif = await getTrendingGifByIdModel(id);
        if (!existingTrendingGif) {
          await addTrendingGifsModel(item);
        }
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get trending gif",
    result: responseJSON,
  };
};

export const getRandomGif = async (ctx: Context) => {
  let responseJSON: any = null;

  const params = {
    api_key: config().GIPHY_API_KEY,
  };
  const response = await giphy.randomGif(params);
  if (response) {
    responseJSON = response;
    if (responseJSON) {
      const id = responseJSON.data.id;
      const existingRandomGif = await getRandomGifByIdModel(id);
      if (!existingRandomGif) {
        await addRandomGifsModel(responseJSON.data);
      }
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get random gif",
    result: responseJSON,
  };
};

export const getGifById = async (ctx: any) => {
  const id = ctx.params.id;

  let responseJSON: any = null;

  if (id) {
    const params = {
      api_key: config().GIPHY_API_KEY,
    };
    const response = await giphy.getGifById(id, params);
    if (response) {
      responseJSON = response;
    } else {
      const formattedGif = await getGifByIdModel(id);
      if (formattedGif && formattedGif._id && formattedGif._id.$oid) {
        formattedGif._id = formattedGif._id.$oid as any;
      }
      responseJSON = formattedGif;
    }
  }

  ctx.response.status = 200;
  ctx.response.body = {
    message: "get gif by id",
    result: responseJSON,
  };
};
