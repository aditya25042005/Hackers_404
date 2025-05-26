import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import joi from 'joi';
import nodemailer from 'nodemailer';
import Temp_User from "../models/user.js";
import User from "../models/perm_user.js";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
console.log('SMTP Password:', process.env.SMTP_PASS);

export const createUser = async (req, res) => {

 try{
    const schema=joi.object({
        name:joi.string().required(),
   email:joi.string().email().required(),
  password:joi.string().min(3).required(),
  



    }).unknown()
const{results,error}=schema.validate(req.body)
if (error){

    return res.status(400).json({
        message:error.details[0].message
    })
}

const {name,email,password}=req.body;
 const salt = await bcrypt.genSalt(10)
const otp = Math.floor(100000 + Math.random() * 900000)+'d';
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adityakarn0001@gmail.com",
   // pass: 'rdze rmaf mrfr kmhp'
    pass:process.env.SMTP_PASS
  },
});
var message = {
  from: "adityakarn0001@gmail.com",
  to: email,
  subject: "WELCOME TO OUR PLATFORM",
  text: 'The OTP is ${otp}',
  html: `<p>Your OTP is <strong>${otp}</strong></p>`

};
    const info = await transporter.sendMail(message);

const hashedpassword = await bcrypt.hash(password, salt)
const user=await Temp_User.create({name,email,password:hashedpassword,otp});




res.status(200).json({
    
message:"otp sent "


 })

 }
 catch(err){
    console.log(err)
res.status(400).json({

    message:err.message
})



 }
}

 export const verifyotp=async(req,res)=>{
    try{
const schema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    otp:joi.string().required(),
    password:joi.string().min(3).required()

})
 const{results,error}=schema.validate(req.body)
if (error){

 return res.status(401).json({
    message:error.message
})
}
const {name,email,password,otp}=req.body;
console.log(name,email,otp,password)
 console.log(otp)
 const user= await  Temp_User.findOne({email,otp})
 //console.log("f",user)
 if(!user){

    return res.status(400).json({message:"otp is not valid"})
 }
   console.log("fk")

 const validate=bcrypt.compareSync(password,user.password)
  console.log("f")

 if(!validate){
return res.status(400).json({message:"not valid"})

 }
 console.log("fo")
 const user_create= await User.create({name:user.name,email,password:user.password,otp})
 return res.status(200).json({message:"user created",user_create})
    }
    catch(err){
     res.status(400).json({message:err.message})


    }

}






export const loginuser=async(req,res)=>{

try{
const {email,password}=req.body
if(!email||!password){
    return res.status(400).json({message:"please enter email and password"})
}

const user=await User.findOne({email})
if(!user){
    return res.status(402).json({message:"user not found"})
}
const isMatch= bcrypt.compareSync(password,user.password)
if(!isMatch){
    return  res.status(401).json({message:"user not found"})
}

const token=jwt.sign({id:user._id,email:user.email},"aditya",{expiresIn:"1d"})
console.log(token)
res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'None',
  secure: false,  // always send cookie only over HTTPS
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
});
res.status(200).json({message:"user found"})
}




catch(err){
    console.log(err)
res.status(400).json({



})



}

}

export const give_email=async(req,res)=>{
try{

const token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"Unauthorized"})
    
}
console.log(token);
const decoded=jwt.verify(token,'aditya')
   // req.user=decoded.email;
  //  console.log({"email":decoded});
    return res.status(200).json({email:decoded.email})




}
catch(err){

 return res.status(401).json({message:"Unauthorized invalid token"})

}


}


 export const  logout=async(req,res)=>{

try{
    console.log("f")
res.clearCookie('token');
return res.status(200).json({message:"user logged out successfully"})
}
catch(err){
    console.log(err)
    return res.status(400).json({message:"error in logging out"})


}
}
/*export const secureRoute = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
//enter in db with password null and in login user put passord null not accespt
    // Continue with your logic
    return res.status(200).json({ message: "Verified", uid, email });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};*/