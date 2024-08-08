import { Request , Response, NextFunction } from "express";

export default interface IAdminController {
    login(req: Request, res: Response): Promise<void>;
}
