import doctorsModel from "../models/doctorsModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailability = async(req,res)=>{
    try {
       const {docId} = req.body
       const docData = await doctorsModel.findById(docId) 
       await doctorsModel.findByIdAndUpdate(docId,{available:!docData.available})
       res.json({success:true,message:'Availability Changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorsModel.find({}).select('-password -email');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorsModel.findOne({ email });
        if (!doctor) return res.json({ success: false, message: 'Invalid Email or Password' });

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        res.json({ success: true, message: 'Logged In', token });
    } catch (error) {
        console.error("Error in signing in doctor:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const appointmentDoctor = async(req,res)=>{
    try{
      
    }
    catch{
        
    }
}
export {changeAvailability,doctorList,loginDoctor}