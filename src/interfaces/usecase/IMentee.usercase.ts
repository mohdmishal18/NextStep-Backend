import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";

export interface loginBody {
    email:string
    password: string
  }

  export interface updateUser{
    status:boolean,
    message:string,
    user ?: IMentee
  }

  export interface loginRes {
    status:boolean
    message : string
    token?: string
    refreshToken ?: string
    user?:IMentee
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

export interface IMenteeUseCase {
    signup(data: IRegisterMentee): Promise<IRegisterMentee>
    verifyOtp(email: string, otp: string): any
    GoogleLogin(data:googleLoginData):Promise<loginRes|null>
    resendOtp(email:string):Promise<string|null>
    sendOtpByEmail(email: string, subject: string): any
    loginAuthentication(data:loginBody):Promise<loginRes|null>
    updateUser(email: string, profilePic: string, coverPic: string):Promise<updateUser|null>
    editDetails(name: string,phone: string,bio: string,education: string,email: string):Promise<updateUser|null>
    googleRegister(data: googleLoginData) :Promise<loginRes|null>
}

export interface IJwtPayload{
  id: string,
  user_id: string
}