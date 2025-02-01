import doctorsModel from "../models/doctorsModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorsModel.findById(docId);
        await doctorsModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorsModel.find({}).select('-password -email');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

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

const appointmentDoctor = async (req, res) => {
    try {
        const { id } = req.doctor;
        const appointments = await appointmentModel.find({ doctorId: id });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const appointmentComplete = async(req, res)=> {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            res.json({ success: true, message: "Appointment Completed" });
        } else {
            res.json({ success: false, message: "Mark Failed" });
        }
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const appointmentCancel = async(req, res)=> {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            res.json({ success: true, message: "Appointment Cancelled" });
        } else {
            res.json({ success: false, message: "Cancellation Failed" });
        }
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const doctorDashboard = async (req, res) => {
    try {
        const { id } = req.doctor;

        const appointments = await appointmentModel.find({ doctorId: id });

        let earnings = 0;
        appointments.forEach(appointment => {
            if (appointment.isCompleted) {
                earnings += appointment.fees;
            }
        });

        let patients = new Set();
        appointments.forEach(appointment => {
            patients.add(appointment.userId);
        });

        const dashData = {
            totalAppointments: appointments.length,
            earnings,
            patients: patients.size,
            latestAppointments: appointments.slice().reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const doctorProfile = async(req,res)=>{
    try {
        const { id } = req.doctor;
        const doctorProfileData = await doctorsModel.findById(id).select('-password');
        res.json({ success: true, doctorProfileData });
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateDocProfile = async(req,res)=>{
    try {
        const { id, fees, address, available } = req.body;
        await doctorsModel.findByIdAndUpdate(id, { fees, address, available });
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error("Error in fetching the data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}      

export { changeAvailability, doctorList, loginDoctor, appointmentDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDocProfile };