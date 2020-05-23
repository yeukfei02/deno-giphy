import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";
import {
  addGifsModel,
  addTrendingGifsModel,
  addRandomGifsModel,
  getGifByIdModel,
  getTrendingGifByIdModel,
  getRandomGifByIdModel,
} from "../model/gif.ts";
import { checkUserLogin } from "../common/common.ts";

export const searchGif = async (context: any) => {
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

    context.response.status = 200;
    context.response.body = {
      message: "search gif",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getTrendingGif = async (context: any) => {
  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "get trending gif",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getRandomGif = async (context: any) => {
  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
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

    context.response.status = 200;
    context.response.body = {
      message: "get random gif",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getGifById = async (context: any) => {
  const id = context.params.id;

  let responseJSON: any = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
    if (id) {
      const params = {
        api_key: config().GIPHY_API_KEY,
      };
      const response = await giphy.getGifById(id, params);
      if (response) {
        responseJSON = response;
      } else {
        const formattedGif = await getGifByIdModel(id);
        if (formattedGif._id && formattedGif._id.$oid) {
          formattedGif._id = formattedGif._id.$oid;
        }
        responseJSON = formattedGif;
      }
    }

    context.response.status = 200;
    context.response.body = {
      message: "get gif by id",
      result: responseJSON,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};