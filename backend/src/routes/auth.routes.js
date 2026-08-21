/* Imported elements */
import express from 'express';
import { registerUser, loginUser, meUser, logoutUser, refreshTheToken } from '../controllers/auth.controller.js';
import { loginUserValidation, registerUserValidation } from '../middlewares/authValidator.middleware.js';
import { authPassByRefreshToken } from '../middlewares/auth.middleware.js';
import { loginUserLimiter, registerUserLimiter } from '../middlewares/rateLimit.middleware.js';

/* Router created */
const router = express.Router();

/*   /api/auth/register Endpoint   */
router.post("/register", registerUserValidation, registerUserLimiter, registerUser);

/*   /api/auth/login Endpoint   */
router.post("/login", loginUserValidation, loginUserLimiter, loginUser);

/*   /api/auth/me Endpoint   */
router.get("/me", authPassByRefreshToken, meUser)

/*   /api/auth/logout Endpoint   */
router.post("/logout", logoutUser);

/*   /api/auth/logout Endpoint   */
router.post("/refresh", refreshTheToken);

export default router;
