import { Request, Response, NextFunction } from "express";
import { CommonCode } from "../../enums/commonCodes";
import IPostController from "../../interfaces/controller/IPost.controller";
import { IPostUsecase } from "../../interfaces/usecase/IPost.usecase";
import { IPost } from "../../entities/post.entity";
import { IJwtPayload } from "../../interfaces/usecase/IMentee.usercase";

export default class PostController implements IPostController {
    private postUsecase;

    constructor(
        postUsecase: IPostUsecase
    ) {
        this.postUsecase = postUsecase
        this.createPost = this.createPost.bind(this)
        this.getAllPosts = this.getAllPosts.bind(this)
    }

    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body
            const result = await this.postUsecase.createPost(data);
            res.status(201).json({ status: 'success', data: result});

        } catch (error) {
            next(error)
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.postUsecase.getAllPosts()
            console.log(result, 'result in the controller')
            res.status(201).json({ status: 'success', posts: result})
        } catch (error) {
            next(error)
        }
    }
}
