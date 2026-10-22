import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import upload from './middleware/filestore.js';
import { register } from './controllers/register.js';
import { login } from './controllers/login.js';
import { authenticate } from './middleware/authenticate.js';
import { logout } from './controllers/logout.js';
import { profile } from './controllers/profile.js';
import { profile_check } from './controllers/profile_check.js';
import { blog_add } from './controllers/blog_add.js';
import { all_blogs } from './controllers/all_blogs.js';
import { draft_blogs } from './controllers/draft_blogs.js';
import { edit_fetch } from './controllers/edit_fetch.js';
import { edit_blogs } from './controllers/edit_blogs.js';
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/profile_pic', express.static('profile_pic'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

dotenv.config({
    path:'C:/Users/Aryan sinha/Desktop/Work/Coding/Hobble/.env'
})

app.post('/api/register',register)
app.post('/api/login',login)
app.post('/api/authenticate',authenticate,(req,res)=>{
    res.status(200).send(req.user);
})
app.post('/api/profile',upload.single('image'),authenticate,profile);
app.post('/api/profile_check',authenticate,profile_check)
app.post('/api/blog_add',authenticate,blog_add)   
app.post('/api/all_blogs',authenticate,all_blogs)   
app.post('/api/draft_blogs',authenticate,draft_blogs)   
app.post('/api/edit_fetch',authenticate,edit_fetch)   
app.post('/api/edit_blogs',authenticate,edit_blogs)   

app.post('/api/logout',logout)

mongoose.connect(process.env.connection_string)
 
app.listen(5000,()=>{
    console.log("Server running on port 5000❤️")
})






