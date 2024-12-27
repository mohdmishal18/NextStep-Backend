import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../frameworks/middlewares/mentor.auth";
import { successResponse } from "../../frameworks/utils/response";
import { HttpStatus } from "../../enums/httpCode";
import IBlogController from "../../interfaces/controller/IBlog.controller";
import { IBlogUsecase } from "../../interfaces/usecase/IBlog.usecase";
import { IBlog } from "../../entities/blog.entity";
import { IJwtPayload } from "../../interfaces/usecase/IMentee.usercase";
import mongoose from "mongoose";

export default class BlogController implements IBlogController {
    private blogUsecase;

    constructor(blogUsecase: IBlogUsecase) {
        this.blogUsecase = blogUsecase
    }

    fetch = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const blogs = await this.blogUsecase.fetch()
            res.status(HttpStatus.OK).json(successResponse(blogs,"feched blog Successfully."))
        } catch (error) {
            next(error)
        }
    }

    create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: IBlog = req.body;
            const user = req.user as IJwtPayload
            data.authorId = new mongoose.Types.ObjectId(user.userId);
            const createdBlog = await this.blogUsecase.create(data);
            res.status(HttpStatus.CREATED).json(successResponse(createdBlog, "Blog created Successfully"))
        } catch (error) {
            next(error)
        }
    }

    fetchById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const blog = await this.blogUsecase.fetchById(id)
            res.status(HttpStatus.OK).json(successResponse(blog,"feched blog Successfully."))
        } catch (error) {
            next(error)
        }
    }

    edit = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const {  } = req.body;
            console.log(id, req.body,"data and id in the controller")
            const blog = await this.blogUsecase.edit(id, req.body)
            res.status(HttpStatus.OK).json(successResponse(blog,"feched blog Successfully."))
        } catch (error) {
            next(error)
        }
    }

    


    
}