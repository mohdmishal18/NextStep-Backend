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
        this.userPosts = this.userPosts.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.likePost = this.likePost.bind(this)
        this.unlikePost = this.unlikePost.bind(this)
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

    async userPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userid} = req.body
            const result = await this.postUsecase.userPosts(userid)
            console.log(result , 'in controler')
            res.status(201).json({ status: 'success', posts: result})
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.body
            const result = await this.postUsecase.deletePost(id)
            console.log(result , 'in controler')
            res.status(201).json({ status: 'success', posts: result})
        } catch (error) {
            next(error)
        }
    }

    async editPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract the post data from the request body
            const postData = req.body;
            console.log(postData, "edit post data")
    
            // Call the use case to update the post
            const result = await this.postUsecase.editPost(postData);
    
            // Respond with the updated post data
            res.status(200).json({ status: 'success', data: result });
    
        } catch (error) {
            next(error); // Pass the error to the next middleware (e.g., error handler)
        }
    }

    async likePost(req: Request,res: Response, next: NextFunction){
        try {
            const {postid,userid} = req.body
            const like = await this.postUsecase.likePost(userid,postid);
            res.status(200).json({status:"success",data:like})
        } catch (error) {
            next(error)
        }
    }
    async unlikePost(req: Request,res: Response, next: NextFunction){
        try {
            
            const {postid,userid} = req.body
            const like = await this.postUsecase.unlikePost(userid,postid);
            res.status(200).json({status:"success",data:like})
        } catch (error) {
            next(error)
        }
    }

}
