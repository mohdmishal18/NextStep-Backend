import bcrypt from 'bcrypt'

import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee from "../entities/mentee.entity";
import { IMenteeUseCase } from "../interfaces/usecase/IMentee.usercase";
import { sendEmail } from "../frameworks/utils/emailService";
import { generateOtp } from '../frameworks/utils/OTPGenerator';
import { ErrorCode } from "../enums/errorCodes";

export class MenteeUseCase implements IMenteeUseCase {
    
    private menteeRepository: IMenteeRepository;

    constructor(menteeRepository: IMenteeRepository) {
        
        this.menteeRepository = menteeRepository;
    }

    async signup(data: IMentee): Promise<IMentee> {
        
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
            // Save OTP to the repository
            await this.menteeRepository.saveOtp(email, otp);
            await sendEmail(email, subject, `Your OTP is: ${otp}`);
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
            await this.menteeRepository.verifyUserAccount(email)
            return OtpVerfication;
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        }
    }
}