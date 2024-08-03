import bcrypt from 'bcrypt'

import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee, {IRegisterMentee} from "../entities/mentee.entity";
import { IMenteeUseCase } from "../interfaces/usecase/IMentee.usercase";
import { sendEmail } from "../frameworks/utils/emailService";
import { generateOtp } from '../frameworks/utils/OTPGenerator';
import { generateOtpHtml } from '../frameworks/utils/otpTemplate';
import { ErrorCode } from "../enums/errorCodes";

import IjwtService from '../interfaces/utils/jwtService';

export class MenteeUseCase implements IMenteeUseCase {
    
    private menteeRepository: IMenteeRepository;
    private jwtService: IjwtService

    constructor(
        menteeRepository: IMenteeRepository,
        jwtService: IjwtService
    ) {
        
        this.menteeRepository = menteeRepository;
        this.jwtService = jwtService;
    }

    async signup(data: IRegisterMentee): Promise<IRegisterMentee> {
        
        try {

            const emailExists = await this.menteeRepository.checkEmailExists(data.email);

            const usernameExists = await this.menteeRepository.checkUsernameExists(
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
            const newUser = await this.menteeRepository.save(data)
            await this.sendOtpByEmail(data.email, "NextStep:Verify Account");
            return newUser

        } catch (error) {
            throw error
        }
    }

    async sendOtpByEmail(email: string, subject: string) {
        try {
            // Generate OTP
            const otp = generateOtp(6);
            const html = generateOtpHtml(otp)
            // Save OTP to the repository
            await this.menteeRepository.saveOtp(email, otp);
            await sendEmail(email, subject, `Your OTP is: ${otp}`,html );
            return
        } catch (error) {
            throw new Error(ErrorCode.FAILED_SENDING_OTP);
        }
    }

    async verifyOtp(email: string, otp: string) {
        try {
            // Verifying OTP from OtpCollection
            const OtpVerfication = await this.menteeRepository.verifyOtp(email, otp);

            // Verifying User Account after OTP Verification
            const user = await this.menteeRepository.verifyUserAccount(email)
            if(user) {
                let payload = {
                    userId: user._id,
                    name: user.name,
                    role: user.role
                }

                let token = this.jwtService.generateToken(payload)
                let refreshToken = this.jwtService.generateRefreshToken(payload)

                return {
                    status: true,
                    OtpVerfication,
                    user,
                    token,
                    refreshToken
                }
            }

        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        }
    }

  async resendOtp(email: string) {
    try {
      const user = await this.menteeRepository.checkEmailExists(email);
      if (user) {
        await this.sendOtpByEmail(email, "NextStep:Verify Account");
        return "resendOtp successfull";
      }
      return "invalid email";
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}