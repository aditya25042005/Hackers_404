import mongoose from "mongoose";



const   temp_user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:String,required:true},
  
    created_at:{type:Date,default:Date.now},
    
});


const Temp_User = mongoose.model('temp_user', temp_user);
export  default Temp_User;