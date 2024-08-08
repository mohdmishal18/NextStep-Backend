import bcrypt from 'bcrypt'

import { IMentorRepository } from "../interfaces/repositories/IMentee.repository";
import IMentor, {IRegisterMentor} from "../entities/mentee.entity";
import { IMentorUseCase } from "../interfaces/usecase/IMentee.usercase";
import { sendEmail } from "../frameworks/utils/emailService";
import { generateOtp } from '../frameworks/utils/OTPGenerator';
import { generateOtpHtml } from '../frameworks/utils/otpTemplate';
import { ErrorCode } from "../enums/errorCodes";
import { loginBody } from '../interfaces/usecase/IMentee.usercase';
import { editMentorDetails } from '../entities/mentee.entity';

import { googleLoginData } from '../interfaces/usecase/IMentor.usecase';
import IjwtService from '../interfaces/utils/jwtService';
import IhashingService from '../interfaces/utils/hashingService'; 

export class MentorUseCase implements IMentorUseCase {
    
    private mentorRepository: IMentorRepository;
    private jwtService: IjwtService
    private hashingService: IhashingService

    constructor(
        mentorRepository: IMentorRepository,
        jwtService: IjwtService,
        hashingService: IhashingService,
    ) {
        
        this.mentorRepository = mentorRepository;
        this.jwtService = jwtService;
        this.hashingService = hashingService;
    }

    async signup(data: IRegisterMentor): Promise<IRegisterMentor> {
        
        try {

            const emailExists = await this.mentorRepository.checkEmailExists(data.email);

            const usernameExists = await this.mentorRepository.checkUsernameExists(
                data.name
            );

            if (emailExists) {
                throw new Error(ErrorCode.EMAIL_ALREADY_EXISTS); // Throw for controller handling
            }

            if (usernameExists) {
                throw new Error(ErrorCode.USERNAME_ALREADY_EXISTS); // Throw for controller handling
            }

            //Hash password
            data.password = await bcrypt.hash(data.password as string, 10);

            //create new user.
            const newUser = await this.mentorRepository.save(data)
            await this.sendOtpByEmail(data.email, "NextStep:Verify Account");
            return newUser

        } catch (error) {
            throw error
        }
    }

     // login
  async loginAuthentication(data: loginBody) {
    try {
      const value = await this.mentorRepository.checkEmailExists(data.email);
      if (value) {
        if (!value.password) {
          return {
            status: false,
            message: "this account for login only googleAuth",
          };
        }

        if (value.isBlocked) {
          return {
            status: false,
            message: "this user is blocked ",
          };
        }

        const status = await this.hashingService.compare(
          data.password,
          value.password
        );

        if (!status) {
          return {
            status: false,
            message: "incorrect password",
          };
        }

        // if (value.otpVerified == false) {
        //   let otp = generateOtp(6)
        //   this.menteeRepository.saveOtp(value.email, otp);
        //   const html = generateOtpHtml(otp)
        //   await sendEmail(value.email, "verity you email", `Your OTP is: ${otp}`,html );

        //   return { status: false, message: "otp is not verified" };
        // }

        const payload = {
          userId: value._id,
          name: value.name,
          role: "mentee",
        };

        let token = this.jwtService.generateToken(payload)
        let refreshToken = this.jwtService.generateRefreshToken(payload)

        return { status: true, message: "Login Succesfully", user: value, token, refreshToken };
      }
      return { status: false, message: "Email Not found" };
    } catch (error) {
      return {
        status: false,
        message: "",
      };
    }
  }

    // async sendOtpByEmail(email: string, subject: string) {
    //     try {
    //         // Generate OTP
    //         const otp = generateOtp(6);
    //         console.log(otp, "otp for the user")
            
    //         const html = generateOtpHtml(otp)
    //         // Save OTP to the repository
    //         await this.menteeRepository.saveOtp(email, otp);
    //         await sendEmail(email, subject, `Your OTP is: ${otp}`,html );
    //         return
    //     } catch (error) {
    //         throw new Error(ErrorCode.FAILED_SENDING_OTP);
    //     }
    // }

    // async verifyOtp(email: string, otp: string) {
    //     try {
    //         // Verifying OTP from OtpCollection
    //         const OtpVerfication = await this.menteeRepository.verifyOtp(email, otp);

    //         // Verifying User Account after OTP Verification
    //         const user = await this.menteeRepository.verifyUserAccount(email)
    //         if(user) {
    //             let payload = {
    //                 userId: user._id,
    //                 name: user.name,
    //                 role: user.role
    //             }

    //             let token = this.jwtService.generateToken(payload)
    //             let refreshToken = this.jwtService.generateRefreshToken(payload)

    //             return {
    //                 status: true,
    //                 OtpVerfication,
    //                 user,
    //                 token,
    //                 refreshToken
    //             }
    //         }

    //     } catch (error) {
    //         console.error("Error verifying OTP:", error);
    //         throw error;
    //     }
    // }

//   async resendOtp(email: string) {
//     try {
//       const user = await this.menteeRepository.checkEmailExists(email);
//       if (user) {
//         await this.sendOtpByEmail(email, "NextStep:Verify Account");
//         return "resendOtp successfull";
//       }
//       return "invalid email";
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }

  async updateUser(email: string, profilePic: string, coverPic: string) {
    try {
      const response = await this.mentorRepository.updateUser(email, profilePic, coverPic)
      console.log("res in the use case", response);
      
      if (response) {
        return { status: true, message: "user updated successfully", user: response }
      }
      return { status: false, message: "failed try again" }
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async editDetails(
    name: string,phone: string,bio: string,education: string,email: string
  ) {
    try {
        console.log("Data received in the use case:", name);

        const response = await this.mentorRepository.editDetails(name,phone,email,education,bio);
        console.log("Response from repository:", response);

        if (response) {
            return { status: true, message: "User updated successfully", user: response };
        }
        return { status: false, message: "Failed to update user, please try again" };
    } catch (error) {
        console.error("Error in use case:", error);
        return { status: false, message: "Internal server error" };
    }
}

// googleLogin
async GoogleLogin(data: googleLoginData) {
  let user = await this.mentorRepository.checkEmailExists(data.email);
  if (!user) {
    return { status: false, message: "please register to login" };
  }
  const loginUser = await this.mentorRepository.checkEmailExists(data.email);

  let payload = {
    userId: loginUser?._id as string,
    name: loginUser?.name as string,
    role: "mentor",
  };

  const token = this.jwtService.generateToken(payload);
  const refreshToken = this.jwtService.generateRefreshToken(payload)
  return { status: true, message: "google Login succesfull", token, refreshToken, loginUser };
}

}