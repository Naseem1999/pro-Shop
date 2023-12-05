import jwt from'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

 const protect=asyncHandler(async(req,resp,next)=>{

    let token;
    token=req.cookies.jwt;

    if(token){
        try{
             const decoded=jwt.verify(token,process.env.JWT_SECRET);
           req.user=await User.findById(decoded.userId).select('-password');
           next();
        }catch(error){
            console.log(error);
            resp.status(401);
            throw new Error("Not Authorized ,token failed")
        }
            
}else{
        resp.status(401);
        throw new Error("Not Authorized no token")
    }
})

//Admin middleware

const admin=(req,resp,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        resp.status(401);
        throw new Error("Not Authorized as admin")
    }
}

export {protect,admin};