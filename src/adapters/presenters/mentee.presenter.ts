import IMentee from "../../entities/mentee.entity";

export class MenteePresenter {
    static toResponse(user: IMentee) {
        return {
            name: user.name,
            email: user.email
        }
    }
}