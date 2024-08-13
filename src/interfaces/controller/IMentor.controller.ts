import { Request, Response, NextFunction } from "express";

export default interface IMentorController {
    addMentor(req: Request, res: Response, next: NextFunction): Promise<void>;
}
