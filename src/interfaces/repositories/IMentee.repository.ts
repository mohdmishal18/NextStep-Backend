import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";

export interface IMenteeRepository {
    save(user: IRegisterMentee): Promise<IRegisterMentee>
    checkEmailExists(email: string): Promise<IMentee | null>
    checkUsernameExists(username: string): Promise<Boolean>
    saveOtp(email: string, otp: string):Promise<string>
    verifyOtp(email: string,otp: string): Promise<string>
    verifyUserAccount(email: string): Promise<IMentee | null>
}