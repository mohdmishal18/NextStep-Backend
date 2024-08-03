import IMentee from "../../entities/mentee.entity";

export interface IMenteeUseCase {
    signup(data: IMentee): Promise<IMentee>
    verifyOtp(email: string, otp: string): any
    resendOtp(email:string):Promise<string|null>
    sendOtpByEmail(email: string, subject: string): any
}