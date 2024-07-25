import IMentee from "../../entities/mentee.entity";

export interface IMenteeUseCase {
    signup(data: IMentee): Promise<IMentee>
}