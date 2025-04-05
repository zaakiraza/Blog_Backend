import express from 'express'
import {signupController,loginController,changePassword} from '../Controllers/authController.js'

export const authRoutes=express.Router();

authRoutes.post('/signup',signupController)
authRoutes.post('/login',loginController)
authRoutes.put('/reset/:id',changePassword)