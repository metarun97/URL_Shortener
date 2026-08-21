// Imported items:-
import express from "express";
import { createShortUrl, deleteUrl, getAllUsersUrl, redirectShortUrl } from "../controllers/url.controller.js";
import { authPassByRefreshToken } from '../middlewares/auth.middleware.js';
import { createShortUrlValidation } from "../middlewares/authValidator.middleware.js";
import { createUrlLimiter } from "../middlewares/rateLimit.middleware.js";


// Router created:-
const router = express.Router();


/* /api/url/create Endpoint */
router.post("/create", authPassByRefreshToken, createShortUrlValidation, createUrlLimiter, createShortUrl);

/* /api/url/myAllUrls Endpoint */
router.get("/myAllUrls", authPassByRefreshToken, getAllUsersUrl);

/* /api/url/:id Endpoint */
router.delete("/:id", authPassByRefreshToken, deleteUrl);

/* /api/url/:shortedId redirect Endpoint */
router.get("/:shortedId", redirectShortUrl);

export default router;

