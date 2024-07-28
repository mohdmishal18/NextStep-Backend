import { Request, Response, NextFunction } from "express";

import { IMenteeUseCase } from "../../interfaces/usecase/IMentee.usercase";
import { MenteePresenter } from "../presenters/mentee.presenter";

export class MenteeController {

    private menteeUseCase: IMenteeUseCase

    constructor(menteeUseCase: IMenteeUseCase) {
        this.menteeUseCase = menteeUseCase
    }

    async signup(req: Request, res: Response) {

        try {

            const {name , email,phone, password} = req.body;
            console.log("the incoming body", req.body);

            const user = await this.menteeUseCase.signup({ name , email, phone, password});
            res.status(201).json(MenteePresenter.toResponse(user));
        }
        catch(err) {
            res.status(400).json({"error in registerring" : err});
        }
    }
}