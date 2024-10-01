import express, { Router } from 'express'
//controller
import { MenteeController } from '../../adapters/controllers/mentee.controller'

// repository
import { MenteeRepository } from '../../repository/mentee.repository'

//usecase
import { MenteeUseCase } from '../../usecase/mentee.usecase'

//models
import { OtpModel } from '../models/otp.model'
import UserModel from '../models/user.model'
import Users from '../models/user.model'
import Posts from '../models/post.model'

//utils
import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'

//auth
import menteeAuth from '../middlewares/mentee.auth'

const router: Router = express.Router()

const jwtService = new JwtToken();
const hashingService = new HashingService();

const menteeRepository = new MenteeRepository(Users, Posts)
const menteeUseCase = new MenteeUseCase(menteeRepository, jwtService, hashingService)
const menteeController = new MenteeController(menteeUseCase)

router.post('/signup',(req, res) => menteeController.signup(req, res))
router.post('/signin',(req,res) =>menteeController.login(req,res))
router.post('/google-register',(req,res) => menteeController.googleRegister(req,res))
router.post("/google-login", menteeController.googleLogin)
router.post('/logout',(req,res) => menteeController.logout(req,res))
router.post('/verify-otp', (req, res) => menteeController.verifyOtp(req, res))
router.post('/resend-otp',(req,res) => menteeController.resendOtp(req,res))
router.get('/get-mentee/:id', (req,res) => menteeController.getMenteeById(req,res))
router.post('/edit-picture',menteeAuth,(req,res) => menteeController.updateUser(req,res))
router.post('/edit-details',menteeAuth,(req,res) => menteeController.editDetails(req, res))
router.post('/search-mentees',menteeAuth,(req,res) => menteeController.searchMentees(req,res))



export default router