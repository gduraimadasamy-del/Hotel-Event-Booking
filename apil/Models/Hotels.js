import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const HotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    photo:{
        type:[String],

    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    events:{
        type:[String]

    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        required:true 
    }    
    
})

export default mongoose.model("Hotels", HotelSchema);