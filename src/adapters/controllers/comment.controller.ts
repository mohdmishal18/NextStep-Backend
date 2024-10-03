import { NextFunction, Request, Response } from "express";
import { ICommentUsecase } from "../../interfaces/usecase/IComment.usecase";
import { HttpStatus } from "../../enums/httpCode";
export class CommentController {
    private commentUsecase: ICommentUsecase;
    constructor(commentUsecase: ICommentUsecase) {
        this.commentUsecase = commentUsecase
    }

    async getPostComments(req: Request, res: Response, next: NextFunction) {
        try {
            const postid = req.params.id;
            
            const comments = await this.commentUsecase.getAllComments(postid)
  
            return res.status(HttpStatus.OK).json({ status: "success", comments: comments })
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
                return res.status(HttpStatus.BAD_REQUEST).json({ status: "fail", message: "Post ID and content are required" });
            }
            const comment = await this.commentUsecase.createComment(userid, postid, content);
            return res.status(HttpStatus.CREATED).json({ status: "success", data: comment })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    // Edit a comment
    async editComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { commentId, content } = req.body;

            if (!commentId || !content) {
                return res.status(HttpStatus.BAD_REQUEST).json({ status: "fail", message: "Comment ID and content are required" });
            }

            const updatedComment = await this.commentUsecase.editComment(commentId, content);

            if (!updatedComment) {
                return res.status(HttpStatus.NOT_FOUND).json({ status: "fail", message: "Comment not found" });
            }

            return res.status(HttpStatus.OK).json({ status: "success", data: updatedComment });
        } catch (error) {
            next(error);
        }
    }

    // Delete a comment
    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { commentId } = req.body;

            if (!commentId) {
                return res.status(HttpStatus.BAD_REQUEST).json({ status: "fail", message: "Comment ID is required" });
            }

            const deletedComment = await this.commentUsecase.deleteComment(commentId);

            if (!deletedComment) {
                return res.status(HttpStatus.NOT_FOUND).json({ status: "fail", message: "Comment not found" });
            }

            return res.status(HttpStatus.OK).json({ status: "success", message: "Comment deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}