import { Request, Response, NextFunction } from "express";
export default interface ISubscriptionController {
    fetch(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}