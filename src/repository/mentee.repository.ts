import { IMenteeRepository } from "../interfaces/repositories/IMentee.repository";
import IMentee from "../entities/mentee.entity";
import { UserModel } from "../frameworks/models/user.model";

export class MenteeRepository implements IMenteeRepository {
    async findByEmail(email: string): Promise<IMentee | null> {
        
        const userData = await UserModel.findOne({ email })
        
        // if(!userData) {
        //     throw new Error(`User with ${email} not found !`);
        // }

        return userData
    }

    async save(user: IMentee): Promise<IMentee> {

        const userData = new UserModel(user);
        const newUser = await userData.save();
        
        return newUser;
    }
}