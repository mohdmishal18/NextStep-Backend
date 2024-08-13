import express , { Router, Request, Response, NextFunction } from 'express'

import AdminController from '../../adapters/controllers/admin.controller'
import AdminUsecase from '../../usecase/admin.usecase'
import AdminRepository from '../../repository/admin.repository'
import AdminModel from '../models/admin.model'
import SkillModel from '../models/skill.model'

import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'


const router: Router = express.Router()

const jwtService = new JwtToken()
const hashingService = new HashingService()

const adminRepository = new AdminRepository( AdminModel, SkillModel )
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
router.get('/get-skills',adminController.getAllSkills)
router.post('/add-skill',adminController.addSkill)
router.patch('/list-skill', adminController.listSkill)
router.patch('/edit-skill', adminController.editSkill)

//mentee

//mentor

//mentor-applications

export default router