import IMentor, {IRegisterMentor} from "../../entities/mentor.entity";

export default interface IMentorRepository {
    addMentor(data: IRegisterMentor): Promise<IMentor>
    // checkEmailExists(email: string): Promise<IAdmin | null>
    // checkUserExists(id: string): Promise<IAdmin | null>
    // getAllSkills(): Promise<ISkill[]>
    // addSkill(name: string):Promise<ISkill | void>
}