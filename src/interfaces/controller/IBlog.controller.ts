import { Request, Response, NextFunction } from "express";

export default interface IBlogController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}