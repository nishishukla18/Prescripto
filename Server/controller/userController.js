import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
import doctorsModel from '../models/doctorsModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import razorpay from 'razorpay'

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists. Please login." });
        }

        // Hashing the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const userData = { name, email, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ success: true, token, message: "User registered successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            // Catch duplicate email error from MongoDB
            return res.status(400).json({ message: "Email already exists. Please login." });
        }
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" }); // Generic error message
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" }); // Generic error message
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, token, message: "Login successful!" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getProfile = async (req, res) => {
    try {
        // Get userId from the middleware-populated `req.user`
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not provided" });
        }

        // Fetch user data without the password field
        const userData = await userModel.findById(userId).select("-password");

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, userData });
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file; // Assumes file middleware (e.g., Multer) handles the image upload.

        // Validation: Check for missing fields
        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const updatedData = { name, phone, address, dob, gender };
        await userModel.findByIdAndUpdate(userId, updatedData);

        // If an image file is provided, upload it to Cloudinary
        if (imageFile) {
            const image = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = image.secure_url;

            // Update user's image URL in the database
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.user.id;

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const docData = await doctorsModel.findById(docId).select("-password");
        if (!docData || !docData.available) {
            return res.status(404).json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked || {};
        if (slots_booked[slotDate]?.includes(slotTime)) {
            return res.status(400).json({ success: false, message: "Slot already booked" });
        }

        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }
        slots_booked[slotDate].push(slotTime);

        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const appointmentData = {
            userId,
            doctorId: docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            cancelled: false,
            payment: false,
            isCompleted: false,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
        await doctorsModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
const appointmentList = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments });
    }
    catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.user.id;

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
        if (appointment.userId !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        res.json({ success: true, message: "Appointment cancelled successfully" });

        const { doctorId, slotDate, slotTime } = appointment;
        const docData = await doctorsModel.findById(doctorId).select("-password");

        let slots_booked = docData.slots_booked || {};
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorsModel.findByIdAndUpdate(doctorId, { slots_booked });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export {register,userLogin,getProfile,updateProfile,bookAppointment,appointmentList,cancelAppointment}