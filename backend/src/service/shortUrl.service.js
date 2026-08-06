// Imported items:-
import urlModel from "../models/url.model.js";
import { generateNanoId } from "../utils/genrateUniqueId.js";

// createShortUrlService:-
export const createShortUrlService = async (full_url, userId) => {
  const shortUrl = generateNanoId(7);

  // creating newUrl:-
  const newUrl = await urlModel.create({
    full_url,
    short_url: shortUrl,
    user: userId
  })
  return newUrl;
}
