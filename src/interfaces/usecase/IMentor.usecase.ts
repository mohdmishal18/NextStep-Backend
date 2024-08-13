import IMentor, {IRegisterMentor} from "../../entities/mentor.entity";


export default interface IMentorUsecase {
  addMentor(data: IRegisterMentor): Promise<IMentor>
}