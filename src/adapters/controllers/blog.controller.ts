import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../frameworks/utils/response";
import { HttpStatus } from "../../enums/httpCode";
import { inject, injectable } from "inversify"; // Import the decorators from Inversify
import IBlogController from "../../interfaces/controller/IBlog.controller";
import { IBlogUsecase } from "../../interfaces/usecase/IBlog.usecase";
import { IBlog } from "../../entities/blog.entity";
import { TYPES } from "../../frameworks/configs/types";

@injectable() 
export default class BlogController implements IBlogController {
    private blogUsecase: IBlogUsecase;

    // Use the @inject decorator to inject the dependency into the constructor
    constructor(@inject(TYPES.IBlogUsecase) blogUsecase: IBlogUsecase) {
        this.blogUsecase = blogUsecase;
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: IBlog = req.body;
            const createdBlog = await this.blogUsecase.create(data);
            res.status(HttpStatus.CREATED).json(successResponse(createdBlog, "Blog created Successfully"));
        } catch (error) {
            next(error);
        }
    };
}
