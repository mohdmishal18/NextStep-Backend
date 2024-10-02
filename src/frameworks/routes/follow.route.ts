import express , { Router, Request, Response, NextFunction } from 'express'
import menteeAuth from '../middlewares/mentee.auth'
import FollowController from '../../adapters/controllers/follow.controller'
import FollowUsecase from '../../usecase/follow.usecase'
import FollowRepository from '../../repository/follow.repository'

import { FollowModel } from '../models/follow.model'

const router: Router = express.Router()

const followRepository = new FollowRepository(FollowModel)
const followUsecase = new FollowUsecase(followRepository)
const followController = new FollowController(followUsecase)


router.post('/follow',menteeAuth,followController.followAccount)
router.post('/unfollow',menteeAuth,followController.unfollowAcccount)
router.post('/count',menteeAuth,followController.getFollowCount)
router.post('/followStatus',menteeAuth,followController.getFollowUnFollowstatus)

export default router