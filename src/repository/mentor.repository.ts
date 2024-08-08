import { Model } from "mongoose";
import { IMentorRepository } from "../interfaces/repositories/IMentor.repository";
import {IMentor, IRegisterMentor} from "../entities/mentor.entity";
import MentorModel from "../frameworks/models/mentor.model";

export class MentorRepository implements IMentorRepository {

    async save(user: IRegisterMentor): Promise<IMentor> {

        const userData = new MentorModel(user);
        const newUser = await userData.save()

        return newUser
    }

    async checkUsernameExists(name: string): Promise<Boolean> {
        const user = await MentorModel.findOne({ name: name });
        return user !== null
    }

    async checkEmailExists(email: string): Promise<IMentor|null> {

        return await MentorModel.findOne({ email: email });

    }

    // async saveOtp(email: string, otp: string): Promise<string> {
    //     try {
    //         await OtpModel.deleteMany({ email });
    //         const newOTP = new OtpModel({
    //             email: email,
    //             otp: otp,
    //         })
    //         await newOTP.save();
    //         return otp
    //     } catch (error) {

    //         throw new Error("Error Saving OTP");
    //     }
    // }

    // async verifyOtp(email: string, otp: string): Promise<string> {
    //     try {
    //         // Find the OTP document

    //         const otpFound = await OtpModel.findOne({ email: email, otp: otp }).sort({ expiry: -1 });
    //         console.log(otpFound);
            
    //         if (!otpFound) {
    //             throw new Error("Invalid OTP"); // Throw an error if OTP not found
    //         }
    //         console.log(otpFound);

    //         const expirationDuration = 60 * 1000; // 60 seconds in milliseconds
    //         const currentTime = Date.now();
    //         const otpCreationTime = new Date(otpFound.createdAt).getTime();

    //         // Check if the OTP is expired
    //         if (currentTime - otpCreationTime > expirationDuration) {
    //             throw new Error("OTP has expired"); // Throw an error if OTP is expired
    //         }
           
    //         return "OTP verified successfully";
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         throw error;
    //     }
    // }

    // async approveMentorAccount(email: string): Promise<IMentor | null> {
    //     try {
    //         const updatedUser = await UserModel.findOneAndUpdate(
    //             { email: email },
    //             { $set: { isApproved: true } },
    //             { new: true } // Return the modified document
    //         );
    //         if (updatedUser) {
    //             return updatedUser
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // async updateUser(email: string, profilePic: string, coverPic: string): Promise<IMentor | null> {
    //     try {
    //         return await UserModel.findOneAndUpdate(
    //             { email: email }, // Query to find user by email
    //             { $set: { profilePicture: profilePic, coverPicture: coverPic } }, // Fields to update
    //             { new: true } // Return the updated document
    //           ).exec();
    //     } catch (error) {
    //       throw new Error("Failed to update user");
    //     }
    // }

    // async editDetails(name: string,phone: string,bio: string,education: string,email: string): Promise<IMentor | null> {
    //     try {
    //         console.log("Data received in the repository:", name);
    
    //         const updatedUser = await UserModel.findOneAndUpdate(
    //             { email: email }, // Query to find user by email
    //             { $set: { name: name, phone: phone, education: education, bio: bio } }, // Fields to update
    //             { new: true } // Return the updated document
    //         ).exec();
    
    //         console.log("Updated user in the repository:", updatedUser);
    
    //         return updatedUser;
    //     } catch (error) {
    //         console.error("Error in repository:", error);
    //         throw new Error("Failed to update user");
    //     }
    // }

}