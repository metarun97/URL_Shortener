/* Imported elements */
import express from 'express';
import { registerUser, loginUser, meUser, logoutUser } from '../controllers/auth.controller.js';
import { loginUserValidation, registerUserValidation } from '../middlewares/authValidator.middleware.js';
import { authenticationPass } from '../middlewares/auth.middleware.js';

/* Router created */
const router = express.Router();

/*   /api/auth/register Endpoint   */
router.post("/register", registerUserValidation, registerUser);

/*   /api/auth/login Endpoint   */
router.post("/login", loginUserValidation, loginUser);

/*   /api/auth/me Endpoint   */
router.get("/me", authenticationPass, meUser)

/*   /api/auth/logout Endpoint   */
router.post("/logout", logoutUser);

export default router;
