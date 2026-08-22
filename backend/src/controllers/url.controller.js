// Imported items:-
// import { nanoid } from "nanoid";
// import { generateNanoId } from "../utils/genrateUniqueId.js";
import redisClient from "../db/redis.js";
import urlModel from "../models/url.model.js";
import { createShortUrlService } from "../service/shortUrl.service.js";
// import redis from "../db/redis.js";


//* createShortUrl API Controller:-
export const createShortUrl = async (req, res) => {
  try {
    const { full_url } = req.body;
    const userId = req?.user?.id;

    // if userId not found:-
    if (!userId) {
      return res.status(401).json({
        message: "Unoutherized:User not found",
      })
    }

    // find existing url behalf of full_url:-
    const urlExists = await urlModel.findOne({ full_url });

    // if url already exists then conflict:-
    if (urlExists) {
      return res.status(409).json({
        message: "URL alredy exists",
      })
    }

    // create newUrl for authenticated user:-
    const newUrl = await createShortUrlService(full_url, userId);

    // final response:-
    res.status(201).json({
      message: "Short URL created successfully",
      newUrl: newUrl,
      user: userId,
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//* redirectShortUrl API Controller:-
export const redirectShortUrl = async (req, res) => {
  try {
    const { shortedId } = req.params

    // Initailize cacheKey value by shortedId:-
    const cacheKey = `url:${shortedId}`;

    // Get CachedUrl from the redis cache:-
    const cachedUrl = await redisClient.hGet(cacheKey, "full_url");

    // CachedUrl value come from cache:-
    if (cachedUrl) {
      await redisClient.hIncrBy(cacheKey, "clicks", 1);
      console.log("Redis HIT");
      return res.redirect(cachedUrl);
    }
    // CachedUrl value not come from cache:-
    console.log("Redis MISS");

    // If redis not found then mongoDb:-
    const url = await urlModel.findOne({ short_url: shortedId });

    // if url not found:-
    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }



    // set redisCache:-
    await redisClient.hSet(cacheKey,
      {
        full_url: url.full_url,
        clicks: String(url.clicks),
      })


    // CacheKey expire set:-
    await redisClient.expire(cacheKey, 60 * 60);

    // Increment in clicks:-
    url.clicks += 1;
    await url.save();

    // Redirect to the the url:-
    return res.redirect(url.full_url);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

//* deleteSingleUrl API Controller:-
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    /* Find url by it's id and user */
    const url = await urlModel.findOne({
      _id: id,
      user: userId
    })

    if (!url) {
      return res.status(404).json({
        message: "Url not found & you are not authorized to delete it",
      })
    }

    /* Delete that url which id matched  */
    await urlModel.deleteOne({ _id: id });

    /* Delete that url from the cache  */
    await redisClient.del(`user:urls:${userId}`);

    /* Final response */
    res.status(200).json({
      messsage: "Url deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//* getAllUsersUrl API Controller:-
export const getAllUsersUrl = async (req, res) => {
  try {
    const userId = req?.user?.id;

    // If userId not found:-
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }
    // create cachekey:-
    const cacheKey = `user:urls${userId}`;

    // Save cachekey as cachedUrls:-
    const cachedUrls = await redisClient.get(cacheKey)

    // If cachedUrls found then parse all the user's urls:-
    if (cachedUrls) {
      console.log("Redis HIT");

      return res.status(200).json({
        success: true,
        urls: JSON.parse(cachedUrls),
      });
    }
    console.log("Redis MISS");

    // If urls found:-
    const urls = await urlModel
      .find({ user: userId })
      .sort({ createdAt: -1 }).populate("user").lean();


    // Save data in redis cache:-
    await redisClient.set(cacheKey, JSON.stringify(urls), {
      EX: 60 * 5   // 5 minutes
    })

    // Final response:-
    return res.status(200).json({
      count: urls.length,
      urls,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}


