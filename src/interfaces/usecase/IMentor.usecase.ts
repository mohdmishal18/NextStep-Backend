import { IMentor, IRegisterMentor } from "../../entities/mentor.entity"

export interface loginBody {
    email:string
    password: string
 }

  export interface updateUser{
    status:boolean,
    message:string,
    user ?: IMentor
  }

  export interface loginRes {
    status:boolean
    message : string
    token?: string
    refreshToken ?: string
    user?:IMentor
  }

  interface editDetails {
    fullName: string;
    phone: string;
    email: string;
    education: string;
    bio: string;
  }

  export interface googleLoginData{
    name:string
    email:string
    image:string
  }

export interface IMentorUseCase {
    // signup(data: IRegisterMentor): Promise<IRegisterMentor>
    // verifyOtp(email: string, otp: string): any
    // GoogleLogin(data:googleLoginData):Promise<loginRes|null>
    // loginAuthentication(data:loginBody):Promise<loginRes|null>
    // updateUser(email: string, profilePic: string, coverPic: string):Promise<updateUser|null>
    // editDetails(name: string,phone: string,bio: string,education: string,email: string):Promise<updateUser|null>
}

  