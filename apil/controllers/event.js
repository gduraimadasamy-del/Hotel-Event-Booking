import Event from "../Models/Event.js"
import Hotels from "../Models/Hotels.js"
// import {createError }from "../utill/error.js"


export const createEvent = async (req,res,next )=>{
    const hotelId=req.params.hotelid;
    const newEvent=new Event(req.body)
    try{
        const savedEvent=await newEvent.save();
        try{
            await Hotels.findByIdAndUpdate( hotelId,{
                 $push:{events:savedEvent._id}});
        }
        catch(err)
        {
           next(err)
        }
        res.status(200).json(savedEvent);
        
    }catch(err){
        next(err)
    }
}
export const updateEvent=async(req,res,next)=>{
 try{
    const updatedEvent=await Event.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedEvent)
    }
    catch(err){
        next(err)
    }
}
export const updateEventAvailability = async (req, res, next) => {
    try {
       await Event.updateOne(
        { "eventNumbers._id": req.params.id },
        { $push: { "eventNumbers.$.unavailableDates": req.body.dates  }}
      );
  
      
  
      res.status(200).json("Events status is beene updated");
    } catch (err) {
      next(err);
    }
  };
  
export const deleteEvent=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    try{
            await Event.findByIdAndDelete(req.params.id);
            try{
                await Hotels.findByIdAndUpdate( hotelId,{
                     $pull:{events: req.params.id}});
            }
            catch(err){
                next(err)}
            res.status(200).json("events is deleted")}
           
        catch(err){
            next(err)
        }
    }


export const getEvent=async(req,res,next)=>{
    try{
            const event=await Event.findById(req.params.id)
            res.status(200).json(event)
        }
        catch(err){
            next(err)
        }
}
export const getallEvent=async(req,res,next)=>{
    try{
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
}
export const getHotelEvents=async  (req,res,next)=>{
    try {
        const hotel= await Hotels.findById(req.params.id)
        const list= await Promise.all(
            hotel.events.map((eventId)=>{
        return Event.findById(eventId);
    })
        );
        res.status(200).json(list);

    } catch (err) {
        next(err)
        
    }
}