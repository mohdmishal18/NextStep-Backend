import { IMentor, IRegisterMentor } from "../../entities/mentor.entity";
export interface IMentorRepository {
    save(user: IRegisterMentor): Promise<IMentor>
    // checkEmailExists(email: string): Promise<IMentor | null>
    // checkUsernameExists(username: string): Promise<Boolean>
    // saveOtp(email: string, otp: string):Promise<string>
    // verifyOtp(email: string,otp: string): Promise<string>
    // verifyUserAccount(email: string): Promise<IMentor | null>
    // updateUser(email: string, profilePic: string, coverPic: string):Promise<IMentor|null>
    // editDetails(name: string,phone: string,bio: string,education: string,email: string):Promise<IMentor|null>
}