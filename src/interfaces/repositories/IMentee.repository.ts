import IMentee from "../../entities/mentee.entity";

export interface IMenteeRepository {
    findByEmail(email: string): Promise<IMentee | null>;
    save(user: IMentee): Promise<IMentee>
}