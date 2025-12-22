import jwt  from "jsonwebtoken"
import {createError} from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  };
export const  verifyusers =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.users.id === req.params.id || req.users.isAdmin){
            next();
        }else {
            return next(createError(403,"You are a not autherzied"));
            next();
            
        }
    })
}
export const  verifyadmin  =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.users.isAdmin){
            next();
        }else {
            return next(createError(403,"You are a not autherzied"));
            next();
            
        }
    })}