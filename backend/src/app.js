/* Imported elements */
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';


/* Server created */
const app = express();

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read browser's cookies data */
app.use(cookieParser());


/* Auth routes main endpoint */
app.use("/api/auth", authRoutes);

export default app;
