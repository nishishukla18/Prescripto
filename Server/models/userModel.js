import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: false
    },
    address:{
        type:String
    }, 
    gender:{
        type:String,
        default:"Not Selected"
    },
    dob:{
        type:String,
        default:"Not Selected"
    },
    phone:{
        type:String,
        default:"00000000"
    }
    
},{minimize:false})

const userModel = mongoose.models.user||mongoose.model("user", userSchema);
export default userModel;