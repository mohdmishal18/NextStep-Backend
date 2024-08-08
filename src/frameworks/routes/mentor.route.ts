import express from 'express'
//controller
// import { MentorController } from '../../adapters/controllers/mentor.controller'

// // repository
// import { MentorRepository } from '../../repository/mentor.repository'

// //usecase
// import { MentorUseCase } from '../../usecase/mentor.usecase'

//models
import { OtpModel } from '../models/otp.model'
import UserModel from '../models/user.model'

//utils
import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'

//auth
import mentorAuth from '../middlewares/mentee.auth'

const router = express.Router()

// const jwtService = new JwtToken();
// const hashingService = new HashingService();

// const mentorRepository = new MentorRepository()
// const mentorUseCase = new MentorUseCase(mentorRepository, jwtService, hashingService)
// const mentorController = new MentorController(mentorUseCase)

// router.post('/mentor-apply',(req, res) => mentorController.signup(req, res))
// router.post('/signin',(req,res) =>mentorController.login(req,res))
// router.post("/google-login", mentorController.googleLogin);
// router.post('/logout',(req,res) => mentorController.logout(req,res))

// router.post('/edit-picture',mentorAuth,(req,res) => mentorController.updateUser(req,res))
// router.post('/edit-details',mentorAuth,(req,res) => mentorController.editDetails(req, res))



export default router