import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

const UsersSchema=new mongoose.Schema({
   username:{
        type:String,
        required:true,
        unique:true
        },
   email:{
        type:String,
        required: true,
        unique:true
        },
    phonoNo:{
        type:[String],
        required:true
      },
    city:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }   
    
    
} );

export default mongoose.model("Users", UsersSchema);