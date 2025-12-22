import express from "express"
import {  deleteUsers, getallUsers, getUsers, updateUsers } from "../controllers/users.js"
import { verifyadmin,verifyusers } from "../utill/verfication.js";

const router = express.Router();

// router.get("/checkauthendication",verifytoken,(req,res,next)=>
// {
//     res.send("hello user,is logged in")
// })
// router.get("/checkuser/:id",verifyusers,(req,res,next)=>
//     {
//         res.send("hello user,is logged in and you can be deleted you account;")
//     })
//     router.get("/checkadmin/:id",verifyadmin,(req,res,next)=>
//         {
//             res.send("hello admin,is logged in and you can be deleted you account;")
//         })
    
// update
router.put("/:id",verifyusers,updateUsers);
//deleted
router.delete("/:id",verifyusers,deleteUsers);
//Get
router.get("/:id",verifyusers,getUsers)
//Getall 
router.get("/",verifyadmin,getallUsers)



export default router;