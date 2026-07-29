// Imported items:-
import express from "express";
import { createShortUrl, redirectShortUrl } from "../controllers/url.controller.js";
import { authenticationExcess } from './../middlewares/auth.middleware.js';
import { createShortUrlValidation } from "../middlewares/authValidator.middleware.js";


// Router created:-
const router = express.Router();


/* /api/url/create Endpoint */
// router.post("/create", authenticationExcess, createShortUrlValidation, createShortUrl);
router.post("/create", createShortUrlValidation, createShortUrl);


router.get("/:shortedId", redirectShortUrl);

export default router;

