import express from 'express'
import { getAllPosts, singleUserPosts, getAllPostCount, singleUserPostCount, addPost, deleteAllPosts, deleteSinglePost } from '../Controllers/postsController.js';

export const postRoutes = express.Router();

postRoutes.get('/allPost', getAllPosts);
postRoutes.get('/singleUserPost/:email', singleUserPosts);
postRoutes.get('/postCount', getAllPostCount);
postRoutes.get('/singlePostCount/:email', singleUserPostCount);
postRoutes.post('/', addPost);
postRoutes.delete('/deleteAll', deleteAllPosts);
postRoutes.delete('/deleteSingle/:email', deleteSinglePost);