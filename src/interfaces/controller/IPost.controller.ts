import { Request, Response, NextFunction } from "express";

export default interface IPostController { 
    createPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    userPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    deletePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    editPost(req: Request, res: Response, next: NextFunction): Promise<void>
    likePost(req: Request,res: Response, next: NextFunction): Promise<void>
    unlikePost(req: Request,res: Response, next: NextFunction): Promise<void>
    reportPost(req: Request, res: Response, next: NextFunction): Promise<void>
    getReports(req: Request, res: Response, next: NextFunction): Promise<void>
    hidePost(req: Request, res: Response, next: NextFunction): Promise<void>
}