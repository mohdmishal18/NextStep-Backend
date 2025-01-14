import SearchController from '../../../adapters/controllers/search.controller';
import SearchUseCase from '../../../usecase/search.usecase';
import SearchRepository from '../../../repository/search.repository';
import MentorModel from '../../models/mentor.model';
import SkillModel from '../../models/skill.model';
import SubscriptionModel from '../../models/subscription.model';
import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';

export function createSearchController(): SearchController {
    const searchRepository = new SearchRepository(MentorModel, SkillModel, SubscriptionModel, PostModel, UserModel)
    const searchUsecase = new SearchUseCase(searchRepository);
    return new SearchController(searchUsecase);
}