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
const allowedOrigins = [
  'http://localhost:5173',                    // Local development
  'https://hackers-404-4.onrender.com'        // Deployed frontend on Render
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed - ' + origin));
    }
  },
  credentials: true
}));
app.use(express.json(),cookieParser());          // parse JSON bodies


app.use('/user', userrouter);
app.use('/history', historyrouter);



app.listen(8000, () => {
  console.log(`🚀 Server running on port`);
});