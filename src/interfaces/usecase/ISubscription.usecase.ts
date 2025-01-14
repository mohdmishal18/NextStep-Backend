import { ISubscription } from "../../entities/subscription.entity";

export interface ISubscriptionUsecase {
    fetch(mentorId: string): Promise<ISubscription[]>
    create(data: ISubscription): Promise<ISubscription>
    edit(id: string,data: Partial<ISubscription>): Promise<ISubscription>
    delete(id: string): Promise<ISubscription>
}