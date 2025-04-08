import express from 'express'
import { signupController, loginController, forgetPassword } from '../Controllers/authController.js'

export const authRoutes = express.Router();

authRoutes.post('/signup', signupController)
authRoutes.post('/login', loginController)
authRoutes.post('/reset/id', forgetPassword)