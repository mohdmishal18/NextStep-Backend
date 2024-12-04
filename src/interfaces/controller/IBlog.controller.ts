import { Request, Response, NextFunction } from "express";

export default interface IBlogController {
    fetch(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchById(req: Request,res: Response, next:NextFunction): Promise<void>;
}