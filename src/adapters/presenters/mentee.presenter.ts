import IMentee from "../../entities/mentee.entity";

export class MenteePresenter {
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