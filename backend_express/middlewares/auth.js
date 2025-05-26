import jwt from 'jsonwebtoken';

export const auth=(req,res,next)=>{

try{

const token=req.cookies.token;
console.log("token is",token,req.cookies);
if(!token){console.log("no token found");
    return res.status(401).json({message:"Unauthorized"})
    
}
console.log(token);
const decoded=jwt.verify(token,'aditya')
    req.user=decoded.email;
    console.log(decoded,"d");
    next();




}
catch(err){

 return res.status(401).json({message:"Unauthorized invalid token"})

}


}