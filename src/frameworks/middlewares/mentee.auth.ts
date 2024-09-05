import { NextFunction, Request, Response } from "express";
import JwtToken from "../utils/jwtService";
import { MenteeRepository } from "../../repository/mentee.repository";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";


const jwtService = new JwtToken()
const userRepo = new MenteeRepository(UserModel, PostModel)

interface IAuthRequest extends Request {
  userId?: string;
}

const menteeAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.menteeRefreshToken
  let menteeAccessToken = req.cookies.menteeAccessToken
  console.log("inside the middle ware");
  

  if (!refreshToken) {
    return res.status(401)
      .json({ message: "Not authorized, no refresh token" });
  }

  if (!menteeAccessToken || menteeAccessToken === '' || Object.keys(menteeAccessToken).length === 0) {
    try {
      const newMenteeAccessToken = await refreshAccessToken(refreshToken)
      res.cookie("menteeAccessToken", newMenteeAccessToken, {
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



export default menteeAuth;