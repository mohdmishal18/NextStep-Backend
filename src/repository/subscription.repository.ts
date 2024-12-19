import { Model } from "mongoose";
import { ISubscriptionRepository } from "../interfaces/repositories/ISubscription.repository";
import { ISubscription } from "../entities/subscription.entity";

export default class SubscriptionRepository implements ISubscriptionRepository {
  private subscription: Model<ISubscription>;

  constructor(subscription: Model<ISubscription>) {
    this.subscription = subscription;
  }

  async fetch(mentorId: string): Promise<ISubscription[]> {
    try {
      const subscriptions = await this.subscription.find({mentorId});
      return subscriptions;
    } catch (error) {
      console.log("error while fetching Subscriptions", error);
      throw new Error("failed to fetch subscriptions");
    }
  }

  async create(data: ISubscription): Promise<ISubscription> {
    try {
      const newSubscription = await new this.subscription(data);
      const saveSubscription = await newSubscription.save();

      return saveSubscription;
    } catch (error) {
        console.log("error while creating Subscriptions", error);
        throw new Error("failed to create subscriptions");
    }
  }
}
