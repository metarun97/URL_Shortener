// Imported items:-
import urlModel from "../models/url.model.js";
import { nanoid } from "nanoid";
import { generateNanoId } from "../utils/genrateUniqueId.js";
import { createShortUrlService } from "../service/shortUrl.service.js";

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
    const { shortedId } = req.params;

    // console.log(shortedId)

    // find the url behalf or shortenId:-
    const url = await urlModel.findOne({ short_url: shortedId });

    // if url not found:-
    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

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

//* getAllUsersUrl API Controller:-
export const getAllUsersUrl = async (req, res) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    const urls = await urlModel
      .find({ user: userId })
      .sort({ createdAt: -1 }).populate("user");

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
