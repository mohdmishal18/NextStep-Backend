import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";
import { IPost } from "../../entities/post.entity";
import { googleLoginData } from "../usecase/IMentee.usercase";
export interface IMenteeRepository {
    save(user: IRegisterMentee): Promise<IMentee>
    checkEmailExists(email: string): Promise<IMentee | null>
    checkUsernameExists(username: string): Promise<Boolean>
    saveOtp(email: string, otp: string):Promise<string>
    verifyOtp(email: string,otp: string): Promise<string>
    verifyUserAccount(email: string): Promise<IMentee | null>
    updateUser(email: string, profilePic: string, coverPic: string):Promise<IMentee|null>
    editDetails(name: string,phone: string,bio: string,education: string,email: string):Promise<IMentee|null>
    saveGoogleLogin(data:googleLoginData):Promise<IMentee | null>

    // Search Methods
    searchMentees(query: string): Promise<IMentee[]>;
    searchPosts(query: string): Promise<IPost[]>;

    findMenteeById(menteeId: string): Promise<IMentee>;

}