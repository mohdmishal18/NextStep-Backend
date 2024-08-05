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

            const user = await this.menteeUseCase.signup({ name , email, phone, password, role: "mentee"});
            console.log(user, "this is the user in the controller ...")
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
            const response = await this.menteeUseCase.verifyOtp(body.email,body.otp);

            if(!response?.status) {
                res.status(401).json(response);
                return;
            }

            res.cookie("menteeAccessToken", response.token, { httpOnly: true, maxAge: 1800000 }).cookie("menteeRefreshToken", response.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
        
            console.log("this is the message from verifyotp in the controller.,", response)
            res.status(200).json(response);
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