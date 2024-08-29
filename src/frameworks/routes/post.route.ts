import express , { Router, Request, Response, NextFunction } from 'express'
import menteeAuth from '../middlewares/mentee.auth'
import PostController from '../../adapters/controllers/post.controller'
import PostUsecase from '../../usecase/post.usecase'
import PostRepository from '../../repository/post.repository'
import PostModel from '../models/post.model'

const router: Router = express.Router()

const postRepository = new PostRepository(PostModel)
const postUsecase = new PostUsecase(postRepository)
const postController = new PostController(postUsecase)

router.post('/create-post',menteeAuth, postController.createPost)
router.get('/all-posts',menteeAuth,postController.getAllPosts)

export default router