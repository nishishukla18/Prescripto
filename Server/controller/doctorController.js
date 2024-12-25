import doctorsModel from "../models/doctorsModel.js";

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

export {changeAvailability,doctorList}