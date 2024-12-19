// src/config/cookieConfig.ts
export const cookieConfig = {
    accessToken: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 360000, // 6 minutes
    },
    refreshToken: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  };
  