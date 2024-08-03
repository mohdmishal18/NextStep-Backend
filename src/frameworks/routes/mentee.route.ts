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

const router = express.Router()

const jwtService = new JwtToken();

const menteeRepository = new MenteeRepository()
const menteeUseCase = new MenteeUseCase(menteeRepository, jwtService)
const menteeController = new MenteeController(menteeUseCase)

router.post('/signup',(req, res) => menteeController.signup(req, res))
router.post('/verify-otp', (req, res) => menteeController.verifyOtp(req, res))
router.post('/resend-otp',(req,res) => menteeController.resendOtp(req,res))




export default router