import express from "express"
import { createEvent, deleteEvent, getallEvent, getEvent,getHotelEvents,updateEvent, updateEventAvailability  } from "../controllers/event.js";
import { verifyadmin } from "../utill/verfication.js";
const router = express.Router();

//create
router.post("/:hotelid",verifyadmin, createEvent);
//update
router.put("/:id", verifyadmin,updateEvent);
router.put("/avilability/:id",updateEventAvailability);
//deleted
router.delete("/:id/:hotelid",verifyadmin,deleteEvent);
//Get
router.get("/:id",getEvent)
//Getall 
router.get("/",getallEvent)
router.get("/event/:id",getHotelEvents)


export default router;