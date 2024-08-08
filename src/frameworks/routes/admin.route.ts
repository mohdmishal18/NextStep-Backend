// import express from 'express'
// //controller
// import { AdminController } from '../../adapters/controllers/admin.controller'

// // repository
// import { AdminRepository } from '../../repository/admin.repository'

// //usecase
// import { AdminUseCase } from '../../usecase/admin.usecase'

// //models
// import { OtpModel } from '../models/otp.model'
// import UserModel from '../models/user.model'
// import Users from '../models/user.model'

// //utils
// import JwtToken from '../utils/jwtService'
// import HashingService from '../utils/hashingService'

// //auth
// import adminAuth from '../middlewares/admin.auth'

// const router = express.Router()

// const jwtService = new JwtToken();
// const hashingService = new HashingService();

// const mentorRepository = new AdminRepository(Users)
// const mentorUseCase = new AdminUseCase(mentorRepository, jwtService, hashingService)
// const mentorController = new AdminController(mentorUseCase)

// router.post('/signup',(req, res) => adminController.signup(req, res))
// router.post('/signin',(req,res) =>adminController.login(req,res))
// router.post("/google-login", adminController.googleLogin);
// router.post('/logout',(req,res) => adminController.logout(req,res))
// router.post('/verify-otp', (req, res) => adminController.verifyOtp(req, res))
// router.post('/resend-otp',(req,res) => adminController.resendOtp(req,res))

// router.post('/edit-picture',adminAuth,(req,res) => adminController.updateUser(req,res))
// router.post('/edit-details',adminAuth,(req,res) => adminController.editDetails(req, res))



// export default router