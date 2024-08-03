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
            res.cookie("otpEmail", email, { maxAge: 3600000 });
            res.status(201).json(MenteePresenter.SignUpRes(true, "User created and OTP sent successfully", user.email));
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
            const message = await this.menteeUseCase.verifyOtp(body.email,body.otp);
            console.log("this is the message from verifyotp in the controller.,", message)
            res.status(200).json({ status: 'success', message: message.OtpVerfication, user: message.user });
        } catch (error) {
            console.log(error)
        }
    }

    async resendOtp(req: Request, res: Response) {
        try {
          const response = await this.menteeUseCase.resendOtp(req.body.email);
          if (response == "resendOtp successfull") {
            res.json({ status: true });
          }
        } catch (error) {
          console.log(error);
        }
      }

}