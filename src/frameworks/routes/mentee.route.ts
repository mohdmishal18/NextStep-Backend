import express from 'express'
//controller
import { MenteeController } from '../../adapters/controllers/mentee.controller'

// repository
import { MenteeRepository } from '../../repository/mentee.repository'

//usecase
import { MenteeUseCase } from '../../usecase/mentee.usecase'

//models
import { OtpModel } from '../models/otp.model'
import { UserModel } from '../models/user.model'

//utils
import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'

const router = express.Router()

const jwtService = new JwtToken();
const hashingService = new HashingService();

const menteeRepository = new MenteeRepository()
const menteeUseCase = new MenteeUseCase(menteeRepository, jwtService, hashingService)
const menteeController = new MenteeController(menteeUseCase)

router.post('/signup',(req, res) => menteeController.signup(req, res))
router.post('/signin',(req,res) =>menteeController.login(req,res))
router.post('/logout',(req,res) => menteeController.logout(req,res))
router.post('/verify-otp', (req, res) => menteeController.verifyOtp(req, res))
router.post('/resend-otp',(req,res) => menteeController.resendOtp(req,res))

router.post('/edit-picture',(req,res) => menteeController.updateUser(req,res))
router.post('/edit-details',(req,res) => menteeController.editDetails(req, res))


export default router