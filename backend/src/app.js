/* Imported elements */
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import urlRoutes from './routes/url.routes.js';
import cors from "cors";

/* Server created */
const app = express();

/* Remove cors error */
app.use(cors());

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read browser's cookies data */
app.use(cookieParser());

/* Auth routes main endpoint */
// app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

export default app;
