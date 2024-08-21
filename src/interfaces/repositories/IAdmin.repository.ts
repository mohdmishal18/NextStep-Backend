import IAdmin from "../../entities/admin.entity";
import { ISkill } from "../../entities/admin.entity";
import IMentee from "../../entities/mentee.entity";
import IMentor from "../../entities/mentor.entity";

export default interface IAdminRepository {
    checkEmailExists(email: string): Promise<IAdmin | null>
    checkUserExists(id: string): Promise<IAdmin | null>
    getAllSkills(): Promise<ISkill[]>
    addSkill(name: string):Promise<ISkill | void>
    checkSkillExists(name: string):Promise<ISkill | void>
    editSkill(id: string, updatedData: string): Promise<ISkill | null>;
    listSkill(id: string, isListed: boolean): Promise<ISkill | null>;
    getAllApplications(): Promise<IMentor[]>
    getApprovedApplications(): Promise<IMentor[]>
    approveApplication(id: string, status: string): Promise<IMentor | null>
    rejectApplication(id: string, status: string): Promise<IMentor | null>
    getAllMentee():Promise<IMentee[]>
    blockOrUnBlockMentor(id: string, status: boolean): Promise<IMentor | null>;
    blockOrUnBlockMentee(id: string, status: boolean): Promise<IMentee | null>;
}