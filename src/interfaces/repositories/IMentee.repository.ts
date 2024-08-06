import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";
export interface IMenteeRepository {
    save(user: IRegisterMentee): Promise<IRegisterMentee>
    checkEmailExists(email: string): Promise<IMentee | null>
    checkUsernameExists(username: string): Promise<Boolean>
    saveOtp(email: string, otp: string):Promise<string>
    verifyOtp(email: string,otp: string): Promise<string>
    verifyUserAccount(email: string): Promise<IMentee | null>
    updateUser(email: string, profilePic: string, coverPic: string):Promise<IMentee|null>
    editDetails(name: string,phone: string,bio: string,education: string,email: string):Promise<IMentee|null>
}