import IMentee from "../../entities/mentee.entity";

export interface IMenteeRepository {
    save(user: IMentee): Promise<IMentee>
    checkEmailExists(email: string): Promise<Boolean>
    checkUsernameExists(username: string): Promise<Boolean>
    saveOtp(email: string, otp: string):Promise<string>
    verifyOtp(email: string,otp: string): Promise<string>
    verifyUserAccount(email: string): Promise<IMentee | null>
}