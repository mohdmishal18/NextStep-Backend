import { Request , Response, NextFunction } from "express";

export default interface IFollowController {
    followAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
    unfollowAcccount(req: Request, res: Response, next: NextFunction): Promise<void>;
    getFollowCount(req: Request, res: Response, next: NextFunction): Promise<void>;
    getFollowUnFollowstatus(req: Request, res: Response, next: NextFunction): Promise<void>;
}
