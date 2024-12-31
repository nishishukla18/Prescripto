import express from 'express';
import { register, userLogin, getProfile, updateProfile, bookAppointment, appointmentList, cancelAppointment } from '../controller/userController.js';
import { authUser } from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/userLogin', userLogin);
userRouter.get('/getProfile', authUser, getProfile);
userRouter.post('/updateProfile', upload.single('image'), authUser, updateProfile);
userRouter.post('/bookAppointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, appointmentList);
userRouter.post('/cancelAppointment', authUser, cancelAppointment);

export default userRouter;