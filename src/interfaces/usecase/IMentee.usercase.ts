import IMentee, {IRegisterMentee} from "../../entities/mentee.entity";

export interface loginBody {
    email:string
    password: string
  }

  export interface loginRes {
    status:boolean
    message : string
    token?: string
    refreshToken ?: string
    user?:IMentee
  }

export interface IMenteeUseCase {
    signup(data: IRegisterMentee): Promise<IRegisterMentee>
    verifyOtp(email: string, otp: string): any
    resendOtp(email:string):Promise<string|null>
    sendOtpByEmail(email: string, subject: string): any
    loginAuthentication(data:loginBody):Promise<loginRes|null>
}

  