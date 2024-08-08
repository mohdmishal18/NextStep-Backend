import { IMentor } from "../../entities/mentor.entity";

export class MentorPresenter {
    static SignUpRes(status: boolean, message: string, email: string) {
        return {
            status: status,
            message: message,
            email: email
        }
    }

    static ErrorRes(error: { message: string; code: number }) {
        return {
            error: {
                message: error.message,
                code: error.code,
            }
        };
    }
}