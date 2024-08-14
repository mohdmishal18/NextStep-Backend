import { ISkill } from "../../entities/admin.entity"
import IMentor from "../../entities/mentor.entity"

export interface loginRes {
    message:string,
    adminAccessToken? : string
    adminRefreshToken?:string
}

export default interface IAdminUsecase {
    login(email: string, password: string): Promise<loginRes | void>
    getAllSkills(): Promise<ISkill[]>
    addSkill(name: string): Promise<ISkill | void>
    editSkill(id: string, updatedData: Partial<ISkill>): Promise<ISkill | null>;
    listSkill(id: string, isListed: boolean): Promise<ISkill | null>;
    getAllApplications(): Promise<IMentor[]>
    
}