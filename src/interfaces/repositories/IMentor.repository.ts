import IMentor, {IRegisterMentor} from "../../entities/mentor.entity";

export default interface IMentorRepository {
    addMentor(data: IRegisterMentor): Promise<IMentor>
    checkEmailExists(email: string): Promise<IMentor | null>
}