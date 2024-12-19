import { ISubscription } from "../../entities/subscription.entity";

export interface ISubscriptionUsecase {
    fetch(mentorId: string): Promise<ISubscription[]>
    create(data: ISubscription): Promise<ISubscription>
}