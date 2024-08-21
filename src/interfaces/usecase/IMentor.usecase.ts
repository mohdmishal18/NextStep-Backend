import IMentor, {IRegisterMentor} from "../../entities/mentor.entity";


export interface loginBody {
  email:string
  password: string
}

export interface googleLoginData{
  name:string
  email:string
  image:string
}

export interface loginRes {
  status:boolean
  message : string
  token?: string
  refreshToken ?: string
  user?:IMentor
}

export default interface IMentorUsecase {
  addMentor(data: IRegisterMentor): Promise<IMentor>
  GoogleLogin(data:googleLoginData):Promise<loginRes|null>
  loginAuthentication(data:loginBody):Promise<loginRes|null>
}