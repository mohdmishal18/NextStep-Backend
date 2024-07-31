import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee from "../entities/mentee.entity";
import { UserModel } from "../frameworks/models/user.model";
import { OtpModel } from "../frameworks/models/otp.model";


export class MenteeRepository implements IMenteeRepository {

    async save(user: IMentee): Promise<IMentee> {

        const userData = new UserModel(user);
        const newUser = await userData.save();
        
        return newUser;
    }

    async checkUsernameExists(name: string): Promise<Boolean> {
        const user = await UserModel.findOne({ name: name });
        return user !== null;
    }

    async checkEmailExists(email: string): Promise<Boolean> {

        const user = await UserModel.findOne({ email: email });


        return user !== null;
    }

    async saveOtp(email: string, otp: string): Promise<string> {
        try {
            const newOTP = new OtpModel({
                email: email,
                otp: otp,
            })
            await newOTP.save();
            return otp
        } catch (error) {

            throw new Error("Error Saving OTP");
        }
    }

    async verifyOtp(email: string, otp: string): Promise<string> {
        try {
            // Find the OTP document

            const otpFound = await OtpModel.findOne({ email: email, otp: otp }).sort({ expiry: -1 });
            console.log(otpFound);
            
            if (!otpFound) {
                throw new Error("Invalid OTP"); // Throw an error if OTP not found
            }
            console.log(otpFound);

            const expirationDuration = 60 * 1000; // 60 seconds in milliseconds
            const currentTime = Date.now();
            const otpCreationTime = new Date(otpFound.createdAt).getTime();

            // Check if the OTP is expired
            if (currentTime - otpCreationTime > expirationDuration) {
                throw new Error("OTP has expired"); // Throw an error if OTP is expired
            }
           
            return "OTP verified successfully";
        } catch (error) {
            console.error('Error verifying OTP:', error);
            throw error;
        }
    }

    async verifyUserAccount(email: string): Promise<IMentee | null> {
        try {
            const updatedUser = await UserModel.findOneAndUpdate(
                { email: email },
                { $set: { otpVerified: true } },
                { new: true } // Return the modified document
            );
            if (updatedUser) {
                return updatedUser
            } else {
                return null;
            }
        } catch (error) {
            throw error
        }
    }
}