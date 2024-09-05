import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CommonCode } from "../../enums/commonCodes";

import { IMenteeUseCase } from "../../interfaces/usecase/IMentee.usercase";
import { MenteePresenter } from "../presenters/mentee.presenter";

export class MenteeController {

    private menteeUseCase: IMenteeUseCase

    constructor(menteeUseCase: IMenteeUseCase) {
        this.menteeUseCase = menteeUseCase
        this.googleLogin = this.googleLogin.bind(this)
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

    async login(req: Request, res: Response) {
        try {
          const { email, password } = req.body;
          const data = {
            email,
            password,
          };
    
          const response = await this.menteeUseCase.loginAuthentication(data);

          if (response?.status && response.message == "Login Succesfully") {
            const { token, refreshToken } = response;
            res.cookie("menteeAccessToken", token, {
              httpOnly: true,
              maxAge: 360000,
            }).cookie("menteeRefreshToken", refreshToken, {
              httpOnly: true,
              maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            res.status(200).json({ status: true, message: "Login Succesfully", user: response.user });
          } else if (
            !response?.status &&
            response?.message == "otp is not verified"
          ) {
            res.cookie("otpEmail", email, { maxAge: 3600000 });
            res.status(403).json({ otpVerified: "false" });
          } else if (
            !response?.status &&
            response?.message == "this user is blocked"
          ) {
            res.status(403).json({ message: "this user is blocked" });
          } else if (response?.status) {
            res.status(200).json(response);
          } else if (
            !response?.status &&
            response?.message == "incorrect password"
          ) {
            res.status(403).json(response);
          } else {
            res.status(403).json(response);
          }
        } catch (error) {
          console.log(error);
        }
      }

      async logout(req: Request, res: Response) {
        try {
          res.cookie("menteeRefreshToken", "", { httpOnly: true, expires: new Date() }).cookie("menteeRefreshToken", "", { httpOnly: true, expires: new Date() })
          res.status(200).json({ status: true });
        } catch (error) {
          res.json(error);
        }
      }

    async verifyOtp(req: Request, res: Response) {
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

            res.cookie("menteeAccessToken", response.token, { httpOnly: true, maxAge: 360000 }).cookie("menteeRefreshToken", response.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
        
            console.log("this is the message from verifyotp in the controller.,", response)
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
              res.status(400).json({ message: error.message });
            } else {
              res.status(400).json({ message: "An unexpected error occurred" });
            }
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


      async updateUser(req: Request, res: Response) {
        try {
        const { email , profilePic, coverPic} = req.body
        console.log("data in the controller", req.body)
        const response = await this.menteeUseCase.updateUser(email , profilePic, coverPic)
        console.log(response, "res in the controller");
        
        res.status(200).json(response)
        } catch (error) {
        console.log(error);
        }
      }

      async editDetails(req: Request, res: Response) {
        try {
            const { name,
              phone,
              bio,
              education,
              email
            } = req.body;
            console.log("Data received in the controller:", req.body);
    
            const response = await this.menteeUseCase.editDetails(name,phone,email,education,bio);
            console.log("Response from use case:", response);
    
            res.status(200).json(response);
        } catch (error) {
            console.error("Error in controller:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    }

    async googleLogin(
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>
    ) {
      const { name, email, image } = req.body;
      console.log(req.body, "the google datas");
      
      const data = {
        name,
        email,
        image,
      };
      const response = await this.menteeUseCase.GoogleLogin(data)

      if (response?.status && response?.message == "google Login succesfull") {
        const { token, refreshToken } = response;
        res.cookie("menteeAccessToken", token, {
          httpOnly: true,
          maxAge: 360000,
        }).cookie("menteeRefreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(response);
      } else {
        return res.status(403).json(response)
      }
    }

    async googleRegister(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>) {
      try {
        const { name, email, image } = req.body;
        const data = {
          name,
          email,
          image,
        };
        
        const response = await this.menteeUseCase.googleRegister(data)
        console.log(response, "res on google register");
        
        if (response?.status) {
          const { token, refreshToken } = response;
          res.cookie("menteeAccessToken", token, {
            httpOnly: true,
            maxAge: 360000,
          }).cookie("menteeRefreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          })
          res.status(200).json(response)
        } else {
          res.status(403).json(response)
        }
      } catch (error) {
  
      }
    }
  
    async search(req: Request, res: Response) {
      try {
          const { query } = req.body;

          if (!query || query.trim() === "") {
              return res.status(400).json({ status: false, message: "Search query is required" });
          }

          const results = await this.menteeUseCase.search(query);

          res.status(200).json({ status: true, message: "Search results fetched successfully", data: results });
      } catch (error) {
          console.error("Error in search controller:", error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const errorCode = (error as any).code || 500;
          res.status(errorCode).json(MenteePresenter.ErrorRes({ message: errorMessage, code: errorCode }));
      }
  }

}