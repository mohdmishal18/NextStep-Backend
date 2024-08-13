import IAdmin from "../../entities/admin.entity";
import { ISkill } from "../../entities/admin.entity";

export default interface IAdminRepository {
    checkEmailExists(email: string): Promise<IAdmin | null>
    checkUserExists(id: string): Promise<IAdmin | null>
    getAllSkills(): Promise<ISkill[]>
    addSkill(name: string):Promise<ISkill | void>
    checkSkillExists(name: string):Promise<ISkill | void>
    editSkill(id: string, updatedData: Partial<ISkill>): Promise<ISkill | null>;
    listSkill(id: string, isListed: boolean): Promise<ISkill | null>;
}