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
            console.log(user, "this is the user in the controller ...")
            res.status(201).json({
                status: true,
                message: "User created and OTP sent successfully",
            });
        }
        catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorCode = (error as any).code || 500; // Default to 500 if no code is provided
            res.status(errorCode).json(MenteePresenter.ErrorRes({ message: errorMessage, code: errorCode }));
        }
    }

    async verifyOtp(req: Request, res: Response){
        try {
            const body = req.body;
            if(!body?.email || !body?.otp){
                throw new Error("Missing Data (email or OTP")
            }
            const data = await this.menteeUseCase.verifyOtp(body.email,body.otp);
            res.status(200).json({ status: 'success', data: data });
        } catch (error) {
            console.log(error)
        }
    }

}