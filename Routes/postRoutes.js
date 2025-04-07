import express from 'express'
import { getAllPosts,addPost, getPostCount } from '../Controllers/postsController.js';

export const postRoutes=express.Router();

postRoutes.get('/',getAllPosts);
postRoutes.post('/',addPost);
postRoutes.get('/postCount/:email',getPostCount);