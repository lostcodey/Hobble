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
app.post('/api/logout',logout)
mongoose.connect(process.env.connection_string)
 
app.listen(5000,()=>{
    console.log("Server running on port 5000❤️")
})






