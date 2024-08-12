import { ErrorCode } from "../enums/errorCodes";
import { Model } from "mongoose";
import SkillModel from "../frameworks/models/skill.model";
import IAdmin, { ISkill } from "../entities/admin.entity";
import IAdminRepository from "../interfaces/repositories/IAdmin.repository";

export default class AdminRepository implements IAdminRepository {

  private admin: Model<IAdmin>;
  private skill: Model<ISkill>;

  constructor(admin: Model<IAdmin>, skill: Model<ISkill>) {
    this.admin = admin;
    this.skill = skill;
  }

  async checkEmailExists(email: string): Promise<IAdmin | null> {
    try {
      const admin = await this.admin.findOne({ email });

      if (!admin) {
        throw new Error(ErrorCode.INVALID_ADMIN_EMAIL);
      }

      return admin;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async checkUserExists(id: string): Promise<IAdmin | null> {
    try {
      const admin = await this.admin.findById({ id });
      if (!admin) {
        throw new Error(ErrorCode.INVALID_ADMIN_EMAIL);
      }

      return admin;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAllSkills(): Promise<ISkill[]> {
    try {
      const skills = await this.skill.find().sort({ _id: -1 })
      return skills;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addSkill(name: string): Promise<ISkill | void> {
    try {
        const skill = new this.skill({ name })
        return await skill.save()

    } catch (error) {
        console.log(error)
    }
  }
  
}
