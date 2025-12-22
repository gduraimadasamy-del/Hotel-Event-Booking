import express from "express"
import Hotels from "../Models/Hotels.js";
import { countByCity, countByType, createHotel, deleteHotel, getallHotel, getHotel,updateHotel } from "../controllers/hotels.js";
import { verifyadmin } from "../utill/verfication.js";
const router = express.Router();


//create
router.post("/",verifyadmin, createHotel);
//update
router.put("/:id", verifyadmin,updateHotel);
//deleted
router.delete("/:id",verifyadmin,deleteHotel);
//Get
router.get("/show/:id",getHotel)
//Getall 
router.get("/",getallHotel)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)



export default router; 