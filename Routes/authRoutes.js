import express from 'express'
import { signupController, loginController, forgetPassword, checkForAlreadyPresentEmail,verifyToken } from '../Controllers/authController.js'

export const authRoutes = express.Router();

authRoutes.get('/emailChecker/:email', checkForAlreadyPresentEmail);
authRoutes.post('/signup', signupController);
authRoutes.post('/login', loginController);
authRoutes.post('/reset/id', forgetPassword);
authRoutes.get('/JWTVerify/:token',verifyToken);