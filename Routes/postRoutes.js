import express from 'express'
import { getAllPosts,addPost, getPostCount } from '../Controllers/postsController.js';

export const postRoutes=express.Router();

postRoutes.get('/allPosts',getAllPosts);
postRoutes.post('/addpost',addPost);
postRoutes.get('/postCount/:email',getPostCount)