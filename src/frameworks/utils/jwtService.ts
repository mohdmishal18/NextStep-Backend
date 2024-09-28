import jwt from "jsonwebtoken"
import jwtService, { DecodedJwt, tokenData, tokenForgotData } from '../../interfaces/utils/jwtService'

export default class JwtToken implements jwtService {

  // generating token
  generateToken(data: tokenData) {
    let secretKey = process.env.JWT_ACCESS_TOKEN_SECRET
    if (secretKey) {
      let token = jwt.sign(data, secretKey)
      return token
    }
    throw new Error("Secret Key is Not Available")
  }

  // tokenForEmail
  generateTokenForgot(data: tokenData, expireTime: string) {
    let secretKey = process.env.JWT_ACCESS_TOKEN_SECRET
    if (secretKey) {
      let token = jwt.sign(data, secretKey, { expiresIn: expireTime })
      return token
    }
    throw new Error("Secret Key is Not Available")
  }

  generateRefreshToken(data: tokenData) {
    let refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET
    if (refreshTokenSecretKey) {
      let refreshToken = jwt.sign(data, refreshTokenSecretKey)
      return refreshToken
    }
    throw new Error("refresh secret Key is Not Available")
  }

  // verifying JWT Token
  verifyToken(token: string): DecodedJwt | null {
    try {
      let secretKey = process.env.JWT_ACCESS_TOKEN_SECRET
      let decoded = jwt.verify(token, secretKey!) as DecodedJwt
      return decoded
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return null
      } else {
        throw new Error("JWT verification Error")
      }
    }
  }

  // verify refresh token
  verifyRefreshToken(token: string) {
    try {
      let refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET
      if (refreshSecretKey) {
        let decoded = jwt.verify(token, refreshSecretKey!) as DecodedJwt
        return decoded
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return null
      } else {
        throw new Error("JWT verification Error")
      }
    }
  }
}