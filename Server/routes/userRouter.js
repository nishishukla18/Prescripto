import express from 'express'
import { register,userLogin,getProfile, updateProfile, bookAppointment } from '../controller/userController.js'
import { authUser } from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()
userRouter.post('/register', register)
userRouter.post('/userLogin',userLogin)
userRouter.get('/getProfile', authUser, getProfile)
userRouter.post('/updateProfile',upload.single('image'), authUser, updateProfile)
userRouter.post('/bookAppointment',authUser,bookAppointment)

export default userRouter