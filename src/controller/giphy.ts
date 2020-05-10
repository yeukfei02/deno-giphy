const GIPHY_API_KEY = "l3zCs4VG53GTOVfp3KNBNUaqV1B59Gaw";

export const searchGif = async (context: any) => {
  const urlSearchParams = new URLSearchParams(context.request.url.searchParams);
  const keyword = urlSearchParams.get("keyword");

  let result = null;

  if (keyword) {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}`,
    );
    result = await response.json();
  }

  context.response.body = {
    message: "search gif",
    result: result,
  };
};

export const getTrendingGif = async (context: any) => {
  let result = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}`,
  );
  if (response) {
    result = await response.json();
  }

  context.response.body = {
    message: "get trending gif",
    result: result,
  };
};

export const getRandomGif = async (context: any) => {
  let result = null;

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`,
  );
  if (response) {
    result = await response.json();
  }

  context.response.body = {
    message: "get random gif",
    result: result,
  };
};

export const getGifById = async (context: any) => {
  const id = context.params.id;

  let result = null;

  if (id) {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/${id}?api_key=${GIPHY_API_KEY}`,
    );
    if (response) {
      result = await response.json();
    }
  }

  context.response.body = {
    message: "get gif from id",
    result: result,
  };
};
