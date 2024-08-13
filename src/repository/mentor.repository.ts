import { Model } from "mongoose";
import IMentor,{IRegisterMentor} from "../entities/mentor.entity";
import IMentorRepository from "../interfaces/repositories/IMentor.repository";

export default class MentorRepository implements IMentorRepository {
    private mentor: Model<IMentor>;

    constructor(mentor: Model<IMentor>) {
        this.mentor = mentor
    }

    async addMentor(data: IRegisterMentor): Promise<IMentor> {
        try {
            const newMentor = new this.mentor(data)
            return await newMentor.save()
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }
}