import express from 'express'
import { getAllUsers, getSingleUserByEmail, getSingleUserByName, deleteUser, deleteAllUsers, changePassword, updateUser } from '../Controllers/usersController.js';

export const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/byEmail/:email', getSingleUserByEmail);
usersRoutes.get('/byName/:name', getSingleUserByName);
usersRoutes.delete('/deleteAll/', deleteAllUsers);
usersRoutes.delete('/deleteSingle/:email', deleteUser);
usersRoutes.patch('/reset', changePassword);
usersRoutes.put('/:email', updateUser);