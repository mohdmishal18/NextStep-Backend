import { ISkill } from "../../entities/admin.entity"
import IMentor from "../../entities/mentor.entity"
import IMentee from "../../entities/mentee.entity"

export interface loginRes {
    message:string,
    adminAccessToken? : string
    adminRefreshToken?:string
}

export default interface IAdminUsecase {
    login(email: string, password: string): Promise<loginRes | void>
    getAllSkills(): Promise<ISkill[]>
    addSkill(name: string): Promise<ISkill | void>
    editSkill(id: string, name: string): Promise<ISkill | null>;
    listSkill(id: string, isListed: boolean): Promise<ISkill | null>;
    getAllApplications(): Promise<IMentor[]>
    getApprovedApplications(): Promise<IMentor[]>
    approveApplication(id: string, status: string): Promise<IMentor | null>
    rejectApplication(id: string, status: string): Promise<IMentor | null>
    getAllMentee():Promise<IMentee[]>
    blockMentor(id:string,status:boolean):Promise<string|null>
    blockMentee(id:string,status:boolean):Promise<string|null>
}