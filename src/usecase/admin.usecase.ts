import { ISkill } from "../entities/admin.entity";
import IMentor from "../entities/mentor.entity";
import IAdminRepository from "../interfaces/repositories/IAdmin.repository";
import IAdminUsecase, { loginRes } from "../interfaces/usecase/IAdmin.usecase";
import IhashingService from "../interfaces/utils/hashingService";
import IjwtService from "../interfaces/utils/jwtService";

export default class AdminUsecase implements IAdminUsecase {
  private adminRepository: IAdminRepository;
  private hashingService: IhashingService;
  private jwtService: IjwtService;

  constructor(
    adminRepository: IAdminRepository,
    hashingService: IhashingService,
    jwtService: IjwtService
  ) {
    this.adminRepository = adminRepository;
    this.hashingService = hashingService;
    this.jwtService = jwtService;
  }

  async login(email: string, password: string): Promise<loginRes | void> {
    try {
      const admin = await this.adminRepository.checkEmailExists(email);

      if (!admin) {
        return { message: "Incorrect Password" };
      }

      const checkPassword = await this.hashingService.compare(
        password,
        admin.password
      );

      if (!checkPassword) {
        return { message: "Incorrect Password" };
      }

      let payload = {
        userId: admin._id,
        name: admin.name,
        role: "admin",
      };

      let adminAccessToken = this.jwtService.generateToken(payload);
      let adminRefreshToken = this.jwtService.generateRefreshToken(payload);

      return {
        message: "Login Successfull",
        adminAccessToken,
        adminRefreshToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSkills(): Promise<ISkill[]> {
    try {
      const skills = await this.adminRepository.getAllSkills();
      return skills;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addSkill(name: string): Promise<ISkill | void> {
    try {
      const isSkillExist = await this.adminRepository.checkSkillExists(name);
      if (isSkillExist) {
        throw new Error("Skill Already Exists");
      }

      return await this.adminRepository.addSkill(name);
    } catch (error) {
      console.log(error);
      // Rethrow the error to be handled by the caller
      if (error instanceof Error) {
        throw new Error(error.message || "An unexpected error occurred");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async editSkill(id: string, name: Partial<ISkill>): Promise<ISkill | null> {
    try {
      return await this.adminRepository.editSkill(id, name)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async listSkill(id: string, status: boolean): Promise<ISkill | null> {
    try {
      return await this.adminRepository.listSkill(id, status)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getAllApplications(): Promise<IMentor[]> {
    try {
      const mentors = await this.adminRepository.getAllApplications();
      return mentors;
    } catch (error) {
      console.log(error);
      return []
    }
  }

}
