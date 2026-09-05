// Imported items:-
import express from "express";
import { createShortUrl, deleteUrl, userUrls, redirectShortUrl } from "../controllers/url.controller.js";
import { authPassByRefreshToken } from '../middlewares/auth.middleware.js';
import { createShortUrlValidation } from "../middlewares/authValidator.middleware.js";
import { createUrlLimiter } from "../middlewares/rateLimit.middleware.js";


// Router created:-
const router = express.Router();


/* /api/url/create Endpoint */
router.post("/create", authPassByRefreshToken, createShortUrlValidation, createUrlLimiter, createShortUrl);

/* /api/url/:shortCode redirect Endpoint */
router.get("/:shortCode", redirectShortUrl);

/* /api/url/userUrls Endpoint */
router.get("/", authPassByRefreshToken, userUrls);

/* /api/url/:id Endpoint */
router.delete("/:id", authPassByRefreshToken, deleteUrl);



export default router;

