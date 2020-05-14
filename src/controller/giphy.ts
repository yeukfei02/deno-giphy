import { config } from "https://deno.land/x/dotenv/mod.ts";
import { checkUserLogin } from '../common/common.ts';

export const searchGif = async (context: any) => {
  const urlSearchParams = new URLSearchParams(context.request.url.searchParams);
  const keyword = urlSearchParams.get("keyword");

  let result = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
    if (keyword) {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${config().GIPHY_API_KEY}&q=${keyword}`,
      );
      result = await response.json();
    }

    context.response.status = 200;
    context.response.body = {
      message: "search gif",
      result: result,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getTrendingGif = async (context: any) => {
  let result = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${config().GIPHY_API_KEY}`,
    );
    if (response) {
      result = await response.json();
    }

    context.response.status = 200;
    context.response.body = {
      message: "get trending gif",
      result: result,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};

export const getRandomGif = async (context: any) => {
  let result = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${config().GIPHY_API_KEY}`,
    );
    if (response) {
      result = await response.json();
    }

    context.response.status = 200;
    context.response.body = {
      message: "get random gif",
      result: result,
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

  let result = null;

  const loginStatus = await checkUserLogin(context);
  if (loginStatus) {
    if (id) {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/${id}?api_key=${config().GIPHY_API_KEY}`,
      );
      if (response) {
        result = await response.json();
      }
    }

    context.response.status = 200;
    context.response.body = {
      message: "get gif by id",
      result: result,
    };
  } else {
    context.response.status = 400;
    context.response.body = {
      message: "missing / invalid bearer token",
    };
  }
};
