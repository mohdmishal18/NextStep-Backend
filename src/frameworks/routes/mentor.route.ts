import express , { Router, Request, Response, NextFunction } from 'express'

import MentorController from '../../adapters/controllers/mentor.controller'
import MentorUsecase from '../../usecase/mentor.usecase'
import MentorRepository from '../../repository/mentor.repository'
import MentorModel from '../models/mentor.model'


const router: Router = express.Router()

const mentorRepository = new MentorRepository(MentorModel)
const mentorUsecase = new MentorUsecase(mentorRepository)
const mentorController = new MentorController(mentorUsecase)

router.post('/mentor-apply', mentorController.addMentor)

export default router