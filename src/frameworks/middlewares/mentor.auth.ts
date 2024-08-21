import { NextFunction, Request, Response } from "express";
import JwtToken from "../utils/jwtService";
import MentorModel from "../models/mentor.model";
import MentorRepository from "../../repository/mentor.repository";


const jwtService = new JwtToken()
const userRepo = new MentorRepository(MentorModel)

interface IAuthRequest extends Request {
  userId?: string;
}

const mentorAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.MENTOR_REFRESH_TOKEN
  let menteeAccessToken = req.cookies.MENTOR_ACCESS_TOKEN
  console.log("inside the middle ware");
  

  if (!refreshToken) {
    return res.status(401)
      .json({ message: "Not authorized, no refresh token" });
  }

  if (!menteeAccessToken || menteeAccessToken === '' || Object.keys(menteeAccessToken).length === 0) {
    try {
      const newMenteeAccessToken = await refreshAccessToken(refreshToken)
      res.cookie("MENTOR_ACCESS_TOKEN", newMenteeAccessToken, {
        httpOnly: true,
        maxAge: 1800000,
      })
      menteeAccessToken = newMenteeAccessToken

    } catch (error) {
      return res
        .status(401)
        .json({ message: "Failed to refresh access token" });
    }
   
  }

  next()

}




async function refreshAccessToken(refreshToken: string) {
  try {    
    const decoded = jwtService.verifyRefreshToken(refreshToken)
    if (decoded && decoded.name) {
      const newToken = jwtService.generateToken({ userId: decoded?.userId, name: decoded?.name, role: decoded?.role })
      return newToken
    }
  } catch (error) {
    throw new Error("Invalid refresh token")
  }
}



export default mentorAuth;