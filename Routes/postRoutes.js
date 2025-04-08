import express from 'express'
import { getAllPosts, singleUserPosts, getAllPostCount, singleUserPostCount, addPost, deleteAllPosts, deleteSinglePost } from '../Controllers/postsController.js';

export const postRoutes = express.Router();

postRoutes.get('/', getAllPosts);
postRoutes.get('/:email', singleUserPosts)
postRoutes.get('/postCount/', getAllPostCount);
postRoutes.get('/postCount/:email', singleUserPostCount);
postRoutes.post('/', addPost);
postRoutes.delete('/', deleteAllPosts);
postRoutes.delete('/:email', deleteSinglePost);