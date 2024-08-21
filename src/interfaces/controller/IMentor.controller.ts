import { Request, Response, NextFunction } from "express";

export default interface IMentorController {
    addMentor(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    googleLogin(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>
}
