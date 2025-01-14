import { ISubscription } from "../entities/subscription.entity";
import { ISubscriptionUsecase } from "../interfaces/usecase/ISubscription.usecase";
import { ISubscriptionRepository } from "../interfaces/repositories/ISubscription.repository";

export default class SubscriptionUsecase implements ISubscriptionUsecase {
    private subscriptionRepository: ISubscriptionRepository

    constructor(subscriptionRepository: ISubscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository
    }

    async fetch(mentorId: string): Promise<ISubscription[]> {
        try {
            const blogs = await this.subscriptionRepository.fetch(mentorId)
            return blogs
        } catch (error) {
            throw error
        }
    }

    async create(data: ISubscription): Promise<ISubscription> {
        try {
            const blog = await this.subscriptionRepository.create(data)
            return blog
        } catch (error) {
            throw error
        }
    }

    async edit(id: string,data: Partial<ISubscription>): Promise<ISubscription> {
        try {
            const blog = await this.subscriptionRepository.edit(id,data)
            return blog
        } catch (error) {
            throw error
        }
    }

    async delete(id: string): Promise<ISubscription> {
        try {
            const blog = await this.subscriptionRepository.delete(id)
            return blog
        } catch (error) {
            throw error
        }
    }
}