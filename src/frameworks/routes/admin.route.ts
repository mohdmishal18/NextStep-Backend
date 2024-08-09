import express , { Router, Request, Response, NextFunction } from 'express'

import AdminController from '../../adapters/controllers/admin.controller'
import AdminUsecase from '../../usecase/admin.usecase'
import AdminRepository from '../../repository/admin.repository'
import AdminModel from '../models/admin.model'

import JwtToken from '../utils/jwtService'
import HashingService from '../utils/hashingService'


const router: Router = express.Router()

const jwtService = new JwtToken()
const hashingService = new HashingService()

const adminRepository = new AdminRepository( AdminModel )
const adminUsecase = new AdminUsecase(
    adminRepository,
    hashingService,
    jwtService
)
const adminController = new AdminController(adminUsecase)

//Auth routes
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)

export default router