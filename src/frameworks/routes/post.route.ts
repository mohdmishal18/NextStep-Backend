import express , { Router, Request, Response, NextFunction } from 'express'
import menteeAuth from '../middlewares/mentee.auth'
import adminMenteeAuth from '../middlewares/adminMenteeAuth'
import PostController from '../../adapters/controllers/post.controller'
import PostUsecase from '../../usecase/post.usecase'
import PostRepository from '../../repository/post.repository'
import PostModel from '../models/post.model'
import LikeModel from '../models/postLike.model'
import ReportModel from '../models/report.model'
import adminAuth from '../middlewares/admin.auth'
import { CloudinaryService } from '../utils/CloudinaryService'

const router: Router = express.Router()

const postRepository = new PostRepository(PostModel, LikeModel, ReportModel)
const cloudinaryService = new CloudinaryService();
const postUsecase = new PostUsecase(postRepository, cloudinaryService)
const postController = new PostController(postUsecase)

//route for mentees
router.post('/create-post',menteeAuth, postController.createPost)
router.get('/all-posts',adminMenteeAuth,postController.getAllPosts)
router.post('/user-posts',menteeAuth, postController.userPosts)
router.post('/delete-post',menteeAuth, postController.deletePost)
router.put('/edit-post',menteeAuth,postController.editPost)
router.post('/like-post',menteeAuth, postController.likePost)
router.post('/unlike-post',menteeAuth, postController.unlikePost)

router.post('/report',menteeAuth, postController.reportPost)
router.get('/report', adminAuth,postController.getReports)

router.post('/hide-post',adminAuth, postController.hidePost)

export default router