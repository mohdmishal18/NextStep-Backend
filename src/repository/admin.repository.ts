import { ErrorCode } from "../enums/errorCodes";
import { Model } from "mongoose";
import IAdmin, { ISkill } from "../entities/admin.entity";
import IMentor from "../entities/mentor.entity";
import IAdminRepository from "../interfaces/repositories/IAdmin.repository";
import IMentee from "../entities/mentee.entity";

export default class AdminRepository implements IAdminRepository {

  private admin: Model<IAdmin>;
  private skill: Model<ISkill>;
  private mentor: Model<IMentor>;
  private mentee: Model<IMentee>;

  constructor(admin: Model<IAdmin>, skill: Model<ISkill> , mentor: Model<IMentor>, mentee: Model<IMentee>) {
    this.admin = admin;
    this.skill = skill;
    this.mentor = mentor
    this.mentee = mentee
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
        
      const existingSkill = await this.checkSkillExists(name)
      if (existingSkill) {
        throw new Error("Duplicate Skill");
      }

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

 async editSkill(id: string, name: string): Promise<ISkill | null> {
  try {
    
    const existingSkill = await this.checkSkillExists(name)
    if (existingSkill && existingSkill._id.toString() !== id) {
      throw new Error("Duplicate Skill");
    }

    // Proceed to update the skill
    const skill = await this.skill.findByIdAndUpdate(id, { name: name }, { new: true });
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
        .find({ status: "pending" })
        .populate('skills', 'name') 
        .sort({ _id: -1 });
      return mentors;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async approveApplication(id: string, status: string): Promise<IMentor | null> {
    try {
      const approvedMentor = await this.mentor.findByIdAndUpdate(id, {status: status})
      return approvedMentor
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async getApprovedApplications(): Promise<IMentor[]> {
    try {
      const approvedMentors = await this.mentor
      .find({status: "approved"})
      .populate('skills', 'name') 
      .sort({ _id: -1 });
      return approvedMentors
    } catch (error) {
      console.log(error);
      return []
      
    }
  }

  async rejectApplication(id: string, status: string): Promise<IMentor | null> {
    try {
      const rejectedMentor = await this.mentor.findByIdAndUpdate(id, {status: status})
      return rejectedMentor
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAllMentee(): Promise<IMentee[]> {
    try {
      const mentees = await this.mentee.find().sort({ _id: -1 })
      return mentees
    } catch (error) {
      console.log(error);
      return []
    }
  }

  async blockOrUnBlockMentor(id: string, status: boolean) {
    try {
      return await this.mentor.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: !status } }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async blockOrUnBlockMentee(id: string, status: boolean) {
    try {
      return await this.mentee.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: !status } }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  
}
