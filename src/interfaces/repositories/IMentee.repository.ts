import IMentee from "../../entities/mentee.entity";

export interface IMenteeRepository {
    save(user: IMentee): Promise<IMentee>
    checkEmailExists(email: string): Promise<Boolean>
    checkUsernameExists(username: string): Promise<Boolean>
}