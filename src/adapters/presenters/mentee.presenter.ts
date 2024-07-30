import IMentee from "../../entities/mentee.entity";

export class MenteePresenter {
    static SignUpRes(user: IMentee) {
        return {
            name: user.name,
            email: user.email,
            phone: user.phone
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