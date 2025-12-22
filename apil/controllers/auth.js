import Users from "../Models/Users.js"
import bcrypt from "bcryptjs"
import { createError } from "../utill/error.js";
import jwt from "jsonwebtoken";

// export const register=async(req,res,next)=>{
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(req.body.password, salt);
//         const newUsers=new Users({
//            ...req.body,
//             password:hash
//         })
//         await newUsers.save()
//         res.status(200).send("user is created deee")
        
//     } catch (err) {
//         next(err)
//     }
// }
export const register = async (req, res, next) => {
    try {
      const { username, email, password, ...otherDetails } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      const newUser = new Users({
        username,
        email,
        password: hash,
        ...otherDetails,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (err) {
      next(err);
    }
  };
  
export const login=async(req,res,next)=>{
    try {
        const users = await Users.findOne({username:req.body.username})
        if (!users){    return next(createError(404,"User is not found"))}
        
        const ispaawordCorrect=await bcrypt.compare(req.body.password,users.password)
        if (!ispaawordCorrect)    return next(createError(400,"password is not found"))
        const tokan=jwt.sign({id:users._id,isAdmin:users.isAdmin},process.env.JWT) 
        const{password,isAdmin,...otherDetails}=users._doc;
            
        res.cookie("access_token",tokan,{
            httpOnly:true,
        }).json({details:{...otherDetails},isAdmin});
       
    } catch (err) {
        next(err)
    }
}
