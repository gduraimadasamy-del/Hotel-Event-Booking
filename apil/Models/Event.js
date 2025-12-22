import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const EventSchema=new mongoose.Schema({
   title:{
        type:String,
        required:true,
              },
   price:{
        type:Number,
        required: true,
       
        },
   maxPeople:{
        type:Number,
        required: true,
       
        },
    desc:{
        type:String,
        required:true
    },
    book:{
        type:[String]
    },
    eventNumbers:[{number:Number,unavailableDates :[ {type:Date}] }], 
    } ,{timestamps:true} );

export default mongoose.model("Events", EventSchema);