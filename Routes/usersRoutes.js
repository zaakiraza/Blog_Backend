import express from 'express'
import { getAllUsers, getSingleUser, deleteUser, deleteAllUsers, changePassword, updateUser } from '../Controllers/usersController.js';

export const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/:email', getSingleUser);
usersRoutes.delete('/', deleteAllUsers);
usersRoutes.delete('/:email', deleteUser);
usersRoutes.put('/reset/:id', changePassword);
usersRoutes.patch('/:email', updateUser);