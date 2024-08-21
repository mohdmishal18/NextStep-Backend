import { Request , Response, NextFunction } from "express";

export default interface IAdminController {
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    getAllSkills(req: Request, res: Response, next: NextFunction): Promise<void>;
    addSkill(req: Request, res: Response, next: NextFunction): Promise<void>;
    editSkill(req: Request, res: Response, next: NextFunction): Promise<void>;
    listSkill(req: Request, res: Response, next: NextFunction): Promise<void>;  
    getAllApplication(req: Request, res: Response, next: NextFunction): Promise<void>;
    getApprovedApplications(req: Request, res: Response, next: NextFunction):Promise<void>
    approveApplication(req: Request, res: Response, next: NextFunction): Promise<void>
    rejectApplication(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllMentee(req: Request, res: Response, next: NextFunction): Promise<void>
    blockMentor(req: Request, res: Response, next: NextFunction): Promise<void>
    blockMentee(req: Request, res: Response, next: NextFunction): Promise<void>
}
