import { ErrorCode } from "../enums/errorCodes";
import { Model } from "mongoose";
import IAdmin, { ISkill } from "../entities/admin.entity";
import IMentor from "../entities/mentor.entity";
import IAdminRepository from "../interfaces/repositories/IAdmin.repository";

export default class AdminRepository implements IAdminRepository {

  private admin: Model<IAdmin>;
  private skill: Model<ISkill>;
  private mentor: Model<IMentor>;

  constructor(admin: Model<IAdmin>, skill: Model<ISkill> , mentor: Model<IMentor>) {
    this.admin = admin;
    this.skill = skill;
    this.mentor = mentor
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

  async checkSkillExists(name: string): Promise<ISkill | void> {
    try {
        const skill = await this.skill.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (skill) {
            return skill;
        }
    } catch (error) {
        console.log(error);
    }
 }

 async editSkill(id: string, name: Partial<ISkill>): Promise<ISkill | null> {
  try {
    const skill = await this.skill.findByIdAndUpdate(id, {name: name});
    if (!skill) {
      throw new Error(ErrorCode.INVALID_SKILL_ID);
    }
    return skill;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async listSkill(id: string, status: boolean): Promise<ISkill | null> {
  try {
    const skill = await this.skill.findByIdAndUpdate(id, { isListed: status });
    if (!skill) {
      throw new Error(ErrorCode.INVALID_SKILL_ID);
    }
    return skill;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async getAllApplications(): Promise<IMentor[]> {
  try {
    const mentors = await this.mentor
      .find({ isApproved: false })
      .populate('skills', 'name') // Populate the 'skills' field with the 'name' field of the referenced collection
      .sort({ _id: -1 });
    return mentors;
  } catch (error) {
    console.log(error);
    return [];
  }
}

  
}
