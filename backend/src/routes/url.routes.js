// Imported items:-
import express from "express";
import { createShortUrl, getAllUsersUrl, redirectShortUrl } from "../controllers/url.controller.js";
import { authenticationPass } from '../middlewares/auth.middleware.js';
import { createShortUrlValidation } from "../middlewares/authValidator.middleware.js";


// Router created:-
const router = express.Router();


/* /api/url/create Endpoint */
router.post("/create", authenticationPass, createShortUrlValidation, createShortUrl);

/* /api/url/myAllUrls Endpoint */
router.get("/myAllUrls", authenticationPass, getAllUsersUrl);

/* /api/url/:shortedId redirect Endpoint */
router.get("/:shortedId", redirectShortUrl);

export default router;

