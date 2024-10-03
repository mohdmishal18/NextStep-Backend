import express, { NextFunction, Request, Response }  from "express";
import { CommentRepository } from "../../repository/comment.repository";
import { CommentUsecase } from "../../usecase/comment.usecase";
import { CommentController } from "../../adapters/controllers/comment.controller";
import menteeAuth from "../middlewares/mentee.auth";
const router = express.Router();

const commentRepository = new CommentRepository();
const commentUsecase = new CommentUsecase(commentRepository);
const commentController = new CommentController(commentUsecase)

router.get('/get-comment/:id',menteeAuth,(req: Request, res: Response, next: NextFunction)=>{
    commentController.getPostComments(req,res,next)
})
router.post('/create-comment',menteeAuth,(req: Request, res: Response, next: NextFunction)=>{
    commentController.addComment(req,res,next)
})
router.post('/edit-comment',menteeAuth,(req: Request, res: Response, next:NextFunction) => {
    commentController.editComment(req,res, next)
})
router.post('/delete-comment',menteeAuth,(req: Request, res:Response, next: NextFunction) => {
    commentController.deleteComment(req, res, next)
})

export default router