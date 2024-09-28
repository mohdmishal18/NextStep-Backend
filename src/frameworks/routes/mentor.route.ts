import express , { Router, Request, Response, NextFunction } from 'express'

import MentorController from '../../adapters/controllers/mentor.controller'
import MentorUsecase from '../../usecase/mentor.usecase'
import MentorRepository from '../../repository/mentor.repository'
import MentorModel from '../models/mentor.model'

//utils
import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'


const router: Router = express.Router()

const jwtService = new JwtToken();
const hashingService = new HashingService();

const mentorRepository = new MentorRepository(MentorModel)
const mentorUsecase = new MentorUsecase(mentorRepository , jwtService, hashingService)
const mentorController = new MentorController(mentorUsecase)

router.post('/mentor-apply', mentorController.addMentor)
router.post("/google-login", mentorController.googleLogin);
router.post('/login',mentorController.login)
router.post('/logout',mentorController.logout)

export default router