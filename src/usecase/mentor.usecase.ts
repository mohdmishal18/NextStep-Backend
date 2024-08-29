import bcrypt from 'bcrypt'
import IMentor, {IRegisterMentor} from "../entities/mentor.entity";
import IMentorRepository from "../interfaces/repositories/IMentor.repository";
import IMentorUsecase from "../interfaces/usecase/IMentor.usecase";

import { googleLoginData } from '../interfaces/usecase/IMentor.usecase';
import { loginBody } from '../interfaces/usecase/IMentor.usecase';

import IjwtService from '../interfaces/utils/jwtService';
import IhashingService from '../interfaces/utils/hashingService'; 

export default class MentorUsecase implements IMentorUsecase {
    private mentorRepository: IMentorRepository
    private jwtService: IjwtService
    private hashingService: IhashingService

    constructor(
        mentorRepository: IMentorRepository,
        jwtService: IjwtService,
        hashingService: IhashingService,
    ) {
        this.mentorRepository = mentorRepository;
        this.jwtService = jwtService;
        this.hashingService = hashingService;
    }

    async addMentor(data: IRegisterMentor): Promise<IMentor> {
        try {
            //hash password
            data.password = await bcrypt.hash(data.password as string, 10);
            return await this.mentorRepository.addMentor(data)
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }

    // login
  async loginAuthentication(data: loginBody) {
    try {
      const value = await this.mentorRepository.checkEmailExists(data.email);
      if (value) {
        if (!value.password) {
          return {
            status: false,
            message: "this account for login only googleAuth",
          };
        }

        if (value.isBlocked) {
          return {
            status: false,
            message: "this user is blocked ",
          };
        }

        if(value.status === 'pending') {
            return {
                status: false,
                message: "not accepted by admin !!"
            }
        }

        
        const status = await this.hashingService.compare(
          data.password,
          value.password
        );

        if (!status) {
          return {
            status: false,
            message: "incorrect password",
          };
        }

        // if (value.otpVerified == false) {
        //   let otp = generateOtp(6)
        //   this.menteeRepository.saveOtp(value.email, otp);
        //   const html = generateOtpHtml(otp)
        //   await sendEmail(value.email, "verity you email", `Your OTP is: ${otp}`,html );

        //   return { status: false, message: "otp is not verified" };
        // }

        const payload = {
          userId: value._id,
          name: value.lastName,
          role: "mentor",
        };

        let token = this.jwtService.generateToken(payload)
        let refreshToken = this.jwtService.generateRefreshToken(payload)

        return { status: true, message: "Login Succesfully", user: value, token, refreshToken };
      }
      return { status: false, message: "Email Not found" };
    } catch (error) {
      return {
        status: false,
        message: "",
      };
    }
  }

    async GoogleLogin(data: googleLoginData) {
        let user = await this.mentorRepository.checkEmailExists(data.email);
        if (!user) {
          return { status: false, message: "please register to login" };
        }
        const loginUser = await this.mentorRepository.checkEmailExists(data.email);
    
        let payload = {
          userId: loginUser?._id as string,
          name: loginUser?.lastName as string,
          role: "mentor",
        };
    
        const token = this.jwtService.generateToken(payload);
        const refreshToken = this.jwtService.generateRefreshToken(payload)
        return { status: true, message: "google Login succesfull", token, refreshToken, loginUser };
      }


}