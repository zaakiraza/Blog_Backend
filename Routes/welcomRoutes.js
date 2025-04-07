import express from 'express'

export const welcomeRoutes=express.Router();

welcomeRoutes.get('/',(req,res)=>{
    res.send("Welcome");
});