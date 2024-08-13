import IMentor, {IRegisterMentor} from "../entities/mentor.entity";
import IMentorRepository from "../interfaces/repositories/IMentor.repository";
import IMentorUsecase from "../interfaces/usecase/IMentor.usecase";

export default class MentorUsecase implements IMentorUsecase {
    private mentorRepository: IMentorRepository

    constructor(mentorRepository: IMentorRepository) {
        this.mentorRepository = mentorRepository
    }

    async addMentor(data: IRegisterMentor): Promise<IMentor> {
        try {
            return await this.mentorRepository.addMentor(data)
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }
}