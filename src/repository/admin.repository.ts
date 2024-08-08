import { ErrorCode } from "../enums/errorCodes";
import { Model } from "mongoose";
import IAdmin from "../entities/admin.entity";
import IAdminRepository from "../interfaces/repositories/IAdmin.repository";

export default class AdminRepository implements IAdminRepository {
    
    private admin: Model<IAdmin>

    constructor(
        admin: Model<IAdmin>,

    ) {
        this.admin = admin
    }

    async checkEmailExists(email: string): Promise<IAdmin | null> {

        try {

            const admin = await this.admin.findOne({ email });

            if(!admin) {
                throw new Error(ErrorCode.INVALID_ADMIN_EMAIL)
            }

            return admin

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async checkUserExists(id: string): Promise<IAdmin | null> {

        try {

            const admin = await this.admin.findById({ id })
            if(!admin) {
                throw new Error(ErrorCode.INVALID_ADMIN_EMAIL)
            }

            return admin

        } catch (error) {
            console.log(error)
            return null
        }
    }
}