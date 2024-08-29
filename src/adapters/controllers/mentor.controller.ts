import { Request, Response, NextFunction } from "express";
import { CommonCode } from "../../enums/commonCodes";
import IMentorController from "../../interfaces/controller/IMentor.controller";
import IMentorUsecase from "../../interfaces/usecase/IMentor.usecase";

export default class MentorController implements IMentorController {
  private mentorUsecase;

  constructor(mentorUsecase: IMentorUsecase) {
    this.mentorUsecase = mentorUsecase;
    this.addMentor = this.addMentor.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.  bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

  async addMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const newMentor = await this.mentorUsecase.addMentor(data);
      res.status(201).json({ status: true, MentorData: newMentor });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res
        .cookie(CommonCode.MENTOR_ACCESS_TOKEN, "", {
          httpOnly: true,
          expires: new Date(),
        })
        .cookie(CommonCode.MENTOR_REFRESH_TOKEN, "", {
          httpOnly: true,
          expires: new Date(),
        });
      res.status(200).json({ status: true });
    } catch (error) {
      res.json(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };

      const response = await this.mentorUsecase.loginAuthentication(data);

      if (response?.status && response.message == "Login Succesfully") {
        const { token, refreshToken } = response;
        res
          .cookie(CommonCode.MENTOR_ACCESS_TOKEN, token, {
            httpOnly: true,
            maxAge: 360000,
          })
          .cookie(CommonCode.MENTOR_REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
        res
          .status(200)
          .json({
            status: true,
            message: "Login Succesfully",
            user: response.user,
          });
      }
      // else if (
      //   !response?.status &&
      //   response?.message == "otp is not verified"
      // ) {
      //   res.cookie("otpEmail", email, { maxAge: 3600000 });
      //   res.status(403).json({ otpVerified: "false" });
      // }
      else if (
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
      } 
      else if(!response?.status && response?.message == "not accepted by admin !!") {
        res.status(403).json(response)
      }else {
        res.status(403).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const { name, email, image } = req.body;
    console.log(req.body, "the google datas");

    const data = {
      name,
      email,
      image,
    };
    const response = await this.mentorUsecase.GoogleLogin(data);

    if (response?.status && response?.message == "google Login succesfull") {
      const { token, refreshToken } = response;
      res
        .cookie(CommonCode.MENTOR_ACCESS_TOKEN, token, {
          httpOnly: true,
          maxAge: 360000,
        })
        .cookie(CommonCode.MENTOR_REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      return res.status(200).json(response);
    } else {
      return res.status(403).json(response);
    }
  }
}
