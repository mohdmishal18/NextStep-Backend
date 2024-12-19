import SubscriptionController from '../../../adapters/controllers/subscription.controller';
import SubscriptionUsecase from '../../../usecase/subscription.usecase';
import SubscriptionRepository from '../../../repository/subscription.repository';
import SubscriptionModel from '../../models/subscription.model';

export function createSubscriptionController(): SubscriptionController {
    const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);
    const subscriptionUsecase = new SubscriptionUsecase(subscriptionRepository);
    return new SubscriptionController(subscriptionUsecase);
}
