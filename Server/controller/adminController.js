import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file ? req.file.path : null;

        // Log incoming fields for debugging
        console.log("Received Data:", req.body);
        console.log("Received File:", req.file);

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image if provided
        let imageUrl = null;
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile, {
                resource_type: "image",
                folder: "doctors",
            });
            imageUrl = imageUpload.secure_url;
        }

        // Create and save doctor
        const doctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            image: imageUrl,
            available: true,
            date: Date.now(),
        });

        await doctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully", doctor });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "An error occurred while adding the doctor" });
    }
};

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase() &&
            password === process.env.ADMIN_PASSWORD
        ) {
            // Include email in the payload
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ success: true, message: "Admin logged in successfully", token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const cancelAppointmentAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        if (appointment.cancelled) {
            return res.status(400).json({ success: false, message: "Appointment already cancelled" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment cancelled successfully" });

        const { doctorId, slotDate, slotTime } = appointment;
        const docData = await doctorModel.findById(doctorId).select("-password");

        let slots_booked = docData.slots_booked || {};
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});
        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };
        res.json({ success: true, dashData });

    } catch (error) {
        console.error("Error in adminDashboard:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, cancelAppointmentAdmin, adminDashboard };