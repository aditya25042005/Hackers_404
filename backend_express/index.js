import express from "express";
import mongoose  from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import userrouter from './router/user_router.js'
import historyrouter from './router/history.js'

mongoose.connect(process.env.MONGO_URI).then(()=>{

console.log("connected to database")

}).catch((err)=>{
    console.log("error in connecting");
})

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',  // frontend origin
  credentials: true                 // allow credentials (cookies)
}))


app.use(express.json(),cookieParser());          // parse JSON bodies


app.use('/user', userrouter);
app.use('/history', historyrouter);



app.listen(8000, () => {
  console.log(`🚀 Server running on port`);
});