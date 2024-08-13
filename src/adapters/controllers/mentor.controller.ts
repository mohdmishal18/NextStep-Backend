import { Request, Response, NextFunction } from "express";

import IMentorController from "../../interfaces/controller/IMentor.controller";
import IMentorUsecase from "../../interfaces/usecase/IMentor.usecase";

export default class MentorController implements IMentorController {
    private  mentorUsecase

    constructor(mentorUsecase: IMentorUsecase) {
        this.mentorUsecase = mentorUsecase
        this.addMentor = this.addMentor.bind(this)
    }

    async addMentor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body
            const newMentor = await this.mentorUsecase.addMentor(data)
            res.status(201).json({status: true, MentorData: newMentor})
        } catch (error) {
            console.log(error)
        }
    }
}