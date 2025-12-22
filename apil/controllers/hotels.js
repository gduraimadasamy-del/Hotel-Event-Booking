import e from "express";
import Hotels from "../Models/Hotels.js";
import Event from "../Models/Hotels.js";
import mongoose from "mongoose";


export const createHotel=async(req,res,next)=>{
     const newHotels=new Hotels(req.body)
        try{
            const savedHotels =await newHotels.save()
            res.status(200).json(savedHotels)
        }
        catch(err){
           next(err)
    }
}
export const updateHotel=async(req,res,next)=>{
 try{
    const updatedHotel=await Hotels.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.status(200).json(updatedHotel)
    }
    catch(err){
        next(err)
    }
}
export const deleteHotel=async(req,res,next)=>{
    try{
            await Hotels.findByIdAndDelete(req.params.id);
            res.status(200).json("hotel is deleted")
        }
        catch(err){
            next(err)
        }

}
export const getHotel=async(req,res,next)=>{
    
    try{
            const hotels =await Hotels.findById(req.params.id)
            res.status(200).json(hotels)
        }
        catch(err){
            next(err)
        }
}
export const getallHotel=async(req,res,next)=>{
    const { limit,min,max,...others } = req.query;
    try{
        const Hotel=await Hotels.find({...others,cheapestPrice:{$gt:min |10,$lt:max||1000}}).limit(parseInt(limit) || 0);;
        res.status(200).json(Hotel);
    }
    catch(err){
        next(err)
    }
}
export const countByCity =async(req,res,next)=>{
    const cities = req.query.cities.split(",")  
    try{
        const list=await Promise.all(cities.map(city=>{
            return Hotels.countDocuments({city:city})
        }))
        res.status(200).json(list);
    }
    catch(err){
        next(err)
    }
}
export const countByType=async(req,res,next)=>{
    try{
        const hotelcount=await Hotels.countDocuments({Type:"Hotels"})
        const eventscount= await Hotels.countDocuments({Type:"Events"})
        const cicurscount=await Hotels.countDocuments({Type:"CicursEvents"})
        const gamecount=await Hotels.countDocuments({Type:"GameEvents"}) 
        const djeventcount= await Hotels.countDocuments({Type:"Djevents"})
        res.status(200).json([
            {Type:"Hotels",count:hotelcount},
            {Type:"Events",count:eventscount},
            {Type:"GameEvent",count:gamecount},
            {Type:"CicursEvents",count:cicurscount},
            {Type:"Djevents",count:djeventcount},
        ]);
    }
    catch(err){
        next(err)
    }
}


// export const getHotelEvents = async (req, res, next) => {
//     try {
//         const hotel = await Hotels.findById(req.params.id);

//         if (!hotel) {
//             return res.status(404).json({ message: "Hotel not found" });
//         }

//         console.log("Hotel Events (Raw):", hotel.events);

//         // Convert event IDs to ObjectId only if they are strings
//         const eventIds = hotel.events.map(id => 
//             mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null
//         ).filter(id => id !== null); // Remove invalid IDs

//         if (eventIds.length === 0) {
//             return res.status(200).json([]); // No valid event IDs
//         }

//         const events = await Event.find({ _id: { $in: eventIds } });

//         console.log("Fetched Events:", events);

//         res.status(200).json(events);
//     } catch (err) {
//         next(err);
//     }
// };
// export const getHotelEvents=async  (req,res,next)=>{
//     try {
//         const hotel= await Hotels.findById(req.params.id)
//         const list= await Promise.all(
//             hotel.events.map((eventId)=>{
//         return Event.findById(eventId);
//     })
//         );
//         res.status(200).json(list);

//     } catch (err) {
//         next(err)
        
//     }
// }