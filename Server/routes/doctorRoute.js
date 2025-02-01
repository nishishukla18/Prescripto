import express from 'express';
import { appointmentDoctor, doctorList, loginDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDocProfile } from '../controller/doctorController.js';
import { authDoc } from '../middleware/docAuth.js';

const doctorRouter = express.Router();
doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoc, appointmentDoctor);
doctorRouter.post('/complete-appointment', authDoc, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoc, appointmentCancel);
doctorRouter.get('/dashboard', authDoc, doctorDashboard);
doctorRouter.get('/profile', authDoc, doctorProfile);
doctorRouter.post('/update-profile', authDoc, updateDocProfile);

export default doctorRouter;