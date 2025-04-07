import express from 'express'
import cors from 'cors'
import { connectDB } from './Utils/DB.js';
import { authRoutes } from './Routes/authRoutes.js';
import { usersRoutes } from './Routes/usersRoutes.js';
import { postRoutes } from './Routes/postRoutes.js';
import { welcomeRoutes } from './Routes/welcomRoutes.js';

const app=express();

app.use(cors())

app.use(express.json());
connectDB();

app.use('/',welcomeRoutes);
app.use('/auth',authRoutes);
app.use('/users',usersRoutes);
app.use('/posts',postRoutes);


app.listen(8000,()=>{
    console.log("started");
})