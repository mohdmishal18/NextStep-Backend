import { Model } from "mongoose";
import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee, {IRegisterMentee} from "../entities/mentee.entity";
import UserModel from "../frameworks/models/user.model";
import { IPost } from "../entities/post.entity";
import PostModel from "../frameworks/models/post.model";
import { OtpModel } from "../frameworks/models/otp.model";
import { editMenteeDetails } from "../entities/mentee.entity";
import { googleLoginData } from "../interfaces/usecase/IMentee.usercase";

export class MenteeRepository implements IMenteeRepository {

    private user: Model<IMentee>;
    private post: Model<IPost>;
    constructor(
        user: Model<IMentee>,
        post: Model<IPost>
    ){
        this.user = user;
        this.post = post
    }

    async save(user: IRegisterMentee): Promise<IMentee> {

        const userData = new UserModel(user);
        const newUser = await userData.save();
        
        return newUser;
    }

    async checkUsernameExists(name: string): Promise<Boolean> {
        const user = await UserModel.findOne({ name: name });
        return user !== null
    }

    async checkEmailExists(email: string): Promise<IMentee|null> {

        return await UserModel.findOne({ email: email });

    }

    async saveOtp(email: string, otp: string): Promise<string> {
        try {
            await OtpModel.deleteMany({ email });
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

            const otpFound = await OtpModel.findOne({ email: email, otp: otp }).sort({ expiry: -1 });
            console.log(otpFound);
            
            if (!otpFound) {
                throw new Error("Invalid OTP");
            }
            console.log(otpFound, "OTP");

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

    async updateUser(email: string, profilePic: string, coverPic: string): Promise<IMentee | null> {
        try {
            return await UserModel.findOneAndUpdate(
                { email: email }, // Query to find user by email
                { $set: { profilePicture: profilePic, coverPicture: coverPic } }, // Fields to update
                { new: true } // Return the updated document
              ).exec();
        } catch (error) {
          throw new Error("Failed to update user");
        }
    }

    async editDetails(name: string,phone: string,bio: string,education: string,email: string): Promise<IMentee | null> {
        try {
            console.log("Data received in the repository:", name);
    
            const updatedUser = await UserModel.findOneAndUpdate(
                { email: email }, // Query to find user by email
                { $set: { name: name, phone: phone, education: education, bio: bio } }, // Fields to update
                { new: true } // Return the updated document
            ).exec();
    
            console.log("Updated user in the repository:", updatedUser);
    
            return updatedUser;
        } catch (error) {
            console.error("Error in repository:", error);
            throw new Error("Failed to update user");
        }
    }

    async saveGoogleLogin(data: googleLoginData): Promise<IMentee | null> {
        try {
            const user = new this.user({
              name: data.name,
              email: data.email,
              image: data.image,
              otpVerified: true,
            });
            const newUser = await user.save();
            return newUser
          } catch (error) {
            console.log(error);
            return null
          }
    }

    async searchMentees(query: string): Promise<IMentee[]> {
        try {
            return await UserModel.find({ name: { $regex: query, $options: "i" } }).exec();  // Case-insensitive search by name
        } catch (error) {
            throw new Error("Failed to search users");
        }
    }
    

    // Function to find the mentee by ID
    async findMenteeById(menteeId: string): Promise<IMentee> {
        try {
            const mentee = await UserModel.findById(menteeId);
            if (!mentee) {
                throw new Error('Mentee not found');
            }
            return mentee;
        } catch (error) {
            console.error("Error fetching mentee:", error);
            throw new Error("Failed to fetch mentee");
        }
    }
    
    
}