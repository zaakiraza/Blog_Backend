import express from 'express'
import { getAllUsers,getSingleUser,deleteUser } from '../Controllers/usersController.js';

export const usersRoutes=express.Router();

usersRoutes.get('/allUsers',getAllUsers);
usersRoutes.get('/:email',getSingleUser);
usersRoutes.delete('/:email',deleteUser);