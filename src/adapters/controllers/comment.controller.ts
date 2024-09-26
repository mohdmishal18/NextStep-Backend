import { NextFunction, Request, Response } from "express";
import { ICommentUsecase } from "../../interfaces/usecase/IComment.usecase";

export class CommentController {
    private commentUsecase: ICommentUsecase;
    constructor(commentUsecase: ICommentUsecase) {
        this.commentUsecase = commentUsecase
    }

    async getPostComments(req: Request, res: Response, next: NextFunction) {
        try {
            const postid = req.params.id;
            
            const comments = await this.commentUsecase.getAllComments(postid)
  
            return res.status(200).json({ status: "success", comments: comments })
        } catch (error) {
            next(error)
        }
    }

    async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            let { postid, content, userid } = req.body;
            console.log(req.body, "comment in controller")
            if (content && content.trim()) content = content.trim().slice(0,100);

            if (!postid || !content) {
                return res.status(400).json({ status: "fail", message: "Post ID and content are required" });
            }
            const comment = await this.commentUsecase.createComment(userid, postid, content);
            return res.status(201).json({ status: "success", data: comment })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}