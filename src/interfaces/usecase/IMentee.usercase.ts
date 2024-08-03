import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";

export interface IMenteeUseCase {
    signup(data: IRegisterMentee): Promise<IRegisterMentee>
    verifyOtp(email: string, otp: string): any
    resendOtp(email:string):Promise<string|null>
    sendOtpByEmail(email: string, subject: string): any
}