import { NextFunction, Request, Response } from "express";
import JwtToken from "../utils/jwtService";
import { IJwtPayload } from "../../interfaces/usecase/IMentee.usercase";

const jwtService = new JwtToken();

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
}


const mentorAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.MENTOR_REFRESH_TOKEN;
  let menteeAccessToken = req.cookies.MENTOR_ACCESS_TOKEN;

  if (!refreshToken) {
    return res.status(401).json({ message: "Not authorized, no refresh token" });
  }

  if (!menteeAccessToken || menteeAccessToken === "" || Object.keys(menteeAccessToken).length === 0) {
    try {
      const newMenteeAccessToken = await refreshAccessToken(refreshToken);
      res.cookie("MENTOR_ACCESS_TOKEN", newMenteeAccessToken, {
        httpOnly: true,
        maxAge: 1800000,
      });
      menteeAccessToken = newMenteeAccessToken;
    } catch (error) {
      return res.status(401).json({ message: "Failed to refresh access token" });
    }
  }

  try {
    const userData = jwtService.verifyToken(menteeAccessToken) as IJwtPayload;
    req.user = userData; // Attach `user` data to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwtService.verifyRefreshToken(refreshToken);
    if (decoded && decoded.name) {
      const newToken = jwtService.generateToken({
        userId: decoded.userId,
        name: decoded.name,
        role: decoded.role,
      });
      return newToken;
    }
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export default mentorAuth;
