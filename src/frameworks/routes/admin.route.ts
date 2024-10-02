import express , { Router, Request, Response, NextFunction } from 'express'
import adminAuth from '../middlewares/admin.auth'
import AdminController from '../../adapters/controllers/admin.controller'
import AdminUsecase from '../../usecase/admin.usecase'
import AdminRepository from '../../repository/admin.repository'

import UserModel from '../models/user.model'
import AdminModel from '../models/admin.model'
import MentorModel from '../models/mentor.model'
import SkillModel from '../models/skill.model'

import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'


const router: Router = express.Router()

const jwtService = new JwtToken()
const hashingService = new HashingService()

const adminRepository = new AdminRepository( AdminModel, SkillModel, MentorModel, UserModel )
const adminUsecase = new AdminUsecase(
    adminRepository,
    hashingService,
    jwtService
)
const adminController = new AdminController(adminUsecase)

//Auth routes
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)

//skill management
router.get('/get-skills',adminAuth,adminController.getAllSkills)
router.post('/add-skill',adminController.addSkill)
router.patch('/list-skill', adminController.listSkill)
router.patch('/edit-skill', adminController.editSkill)

//mentee
router.get('/all-mentees',adminController.getAllMentee)

//mentor-applications
router.get('/all-applications', adminController.getAllApplication)
router.put('/approve-mentor',adminController.approveApplication)
router.put('/reject-mentor',adminController.rejectApplication)

//mentors
router.get('/approved-mentors', adminController.getApprovedApplications)

router.post('/block-mentor', adminController.blockMentor)
router.post('/block-mentee', adminController.blockMentee)

export default router