import express from 'express'

import { MenteeController } from '../../adapters/controllers/mentee.controller'
import { MenteeRepository } from '../../repository/mentee.repository'
import { MenteeUseCase } from '../../usecase/mentee.usecase'

const router = express.Router()

const menteeRepository = new MenteeRepository()
const menteeUseCase = new MenteeUseCase(menteeRepository)
const menteeController = new MenteeController(menteeUseCase)

router.post('/signup',(req, res) => menteeController.signup(req, res))



export default router