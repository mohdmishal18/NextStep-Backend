import { Request, Response, NextFunction } from "express";

export default interface ISearchController {
    searchMentors(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchMentees(req: Request, res: Response, next: NextFunction): Promise<void>;
}