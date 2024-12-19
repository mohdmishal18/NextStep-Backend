import { ISubscription } from "../../entities/subscription.entity";

export interface ISubscriptionRepository {
    fetch(mentorId: string): Promise<ISubscription[]>
    create(data : ISubscription): Promise<ISubscription>
}