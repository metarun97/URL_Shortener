// Imported items:-
import urlModel from "../models/url.model.js";
import { createShortUrlService } from "../service/shortUrl.service.js";


//* createShortUrl API Controller:-
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req?.user?.id;

    // if userId not found:-
    if (!userId) {
      return res.status(401).json({
        message: "Unoutherized:User not found",
      })
    }

    // find existing url behalf of originalUrl:-
    const urlExists = await urlModel.findOne({ originalUrl });

    // if url already exists then conflict:-
    if (urlExists) {
      return res.status(409).json({
        message: "URL alredy exists",
      })
    }

    // create newUrl for authenticated user:-
    const newUrl = await createShortUrlService(originalUrl, userId);


    // final response:-
    res.status(201).json({
      message: "Short URL created successfully",
      id: newUrl._id,
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
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
    const { shortCode } = req.params;

    // If Redis missing shortedId by MongoDb:-
    const url = await urlModel.findOne({ shortCode });

    // if url not found:-
    if (!url) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    // Click count
    await urlModel.updateOne(
      { shortCode },
      { $inc: { clicks: 1 } }
    );

    return res.redirect(url.originalUrl);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

//* getAllUsersUrl API Controller:-
export const userUrls = async (req, res) => {
  try {
    const userId = req?.user?.id;

    // If userId not found means user Unauthorized:-
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    // If urls not found in cache then get from mongoDB:-
    const urls = await urlModel
      .find({ user: userId })
      .sort({ createdAt: -1 }).populate("user").lean();


    // Final response:-
    res.status(200).json({
      count: urls.length,
      urls
    });
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
    await urlModel.findOneAndDelete({
      _id: id,
      user: userId
    })

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


