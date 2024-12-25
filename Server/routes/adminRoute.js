
import express from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controller/adminController.js";
import { changeAvailability } from "../controller/doctorController.js";
import upload from "../middleware/multer.js";
import { authAdmin } from "../middleware/authAdmin.js";

const adminRouter = express.Router();

// Add Doctor Route
adminRouter.post(
    "/add-doctor",
    authAdmin,
    (req, res, next) => {
        upload.single("image")(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
            next();
        });
    },
    addDoctor
);

adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.post("/login", loginAdmin);

export default adminRouter;
