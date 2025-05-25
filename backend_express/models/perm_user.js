import mongoose from "mongoose";



const   user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
  
    created_at:{type:Date,default:Date.now},
    
});


const User = mongoose.model('Usera', user);
export  default User;