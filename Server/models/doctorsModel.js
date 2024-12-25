import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true
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
    degree:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:String,
        default:true
    },
    fees:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date: {
        type: Number,
        required: true,
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{minimize:false})

const doctorModel = mongoose.model('Doctor', doctorSchema);
export default doctorModel;