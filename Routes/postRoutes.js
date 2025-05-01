import express from 'express'
import { getAllPosts, singleUserPosts, getAllPostCount, singleUserPostCount, addPost, deleteSinglePost } from '../Controllers/postsController.js';

export const postRoutes = express.Router();

postRoutes.get('/allPost', getAllPosts);
postRoutes.get('/singleUserPost/:email', singleUserPosts);
postRoutes.get('/postCount', getAllPostCount);
postRoutes.get('/singlePostCount/:email', singleUserPostCount);
postRoutes.post('/:token', addPost);
postRoutes.delete('/deleteSingle/:email', deleteSinglePost);