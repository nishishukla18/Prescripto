// Controller to add/register a new doctor
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';

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
        res.json({ success: true, doctors }); // Corrected response
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
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({ success: true, message: "Admin logged in successfully", token });
      } else {
          return res.status(401).json({ success: false, message: "Invalid Email or Password" });
      }
  } catch (error) {
      console.error("Error in loginAdmin:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};


export { addDoctor ,allDoctors,loginAdmin};
