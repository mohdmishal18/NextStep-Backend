import { NextFunction, Request, Response } from "express";
import JwtToken from "../utils/jwtService";

const jwtService = new JwtToken();

interface IAuthRequest extends Request {
  userId?: string;
  name?: string;
  role?: string;
}

const adminMenteeAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  let accessToken = req.cookies.ADMIN_ACCESS_TOKEN || req.cookies.MENTEE_ACCESS_TOKEN;
  const refreshToken = req.cookies.ADMIN_REFRESH_TOKEN || req.cookies.MENTEE_REFRESH_TOKEN;

  console.log("Inside the admin/mentee middleware");

  if (!refreshToken) {
    return res.status(401).json({ message: "Not authorized, no refresh token" });
  }

  if (!accessToken || accessToken === '' || Object.keys(accessToken).length === 0) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      
      // Depending on whether it's an admin or mentee, set the appropriate access token
      if (req.cookies.ADMIN_REFRESH_TOKEN) {
        res.cookie("ADMIN_ACCESS_TOKEN", newAccessToken, {
          httpOnly: true,
          maxAge: 1800000, // 30 minutes
        });
      } else {
        res.cookie("MENTEE_ACCESS_TOKEN", newAccessToken, {
          httpOnly: true,
          maxAge: 1800000, // 30 minutes
        });
      }
      
      accessToken = newAccessToken;
    } catch (error) {
      return res.status(401).json({ message: "Failed to refresh access token" });
    }
  }

  try {
    const decodedToken = jwtService.verifyToken(accessToken);
    
    // Ensure the decoded token exists before trying to access its properties
    if (decodedToken && decodedToken.userId && decodedToken.role) {
      req.userId = decodedToken.userId;
      req.role = decodedToken.role; // Attach the user role (admin/mentee) for further use in the app

      if (decodedToken.role !== 'admin' && decodedToken.role !== 'mentee') {
        return res.status(403).json({ message: "Forbidden, invalid role" });
      }
      next();
    } else {
      return res.status(401).json({ message: "Invalid access token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

// Helper function to refresh the access token
async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = jwtService.verifyRefreshToken(refreshToken);
    
    if (decoded && decoded.name) {
      const newToken = jwtService.generateToken({ 
        userId: decoded.userId, 
        name: decoded.name, 
        role: decoded.role 
      });
      return newToken;
    } else {
      throw new Error("Invalid refresh token");
    }
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export default adminMenteeAuth;
