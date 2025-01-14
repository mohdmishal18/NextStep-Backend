import { IBlogUsecase } from "../interfaces/usecase/IBlog.usecase";
import { IBlogRepository } from "../interfaces/repositories/IBlog.repository";
import { ISearchUsecase } from "../interfaces/usecase/ISearch.usecase";
import { ISearchRepository, SearchFilters, SearchMenteeFilters, SearchMenteeResult, SearchPostFilters, SearchPostResult, SearchResult } from "../interfaces/repositories/ISearch.repository";

export default class SearchUseCase implements ISearchUsecase {
    private searchRepository: ISearchRepository;
  
    constructor(searchRepository: ISearchRepository) {
      this.searchRepository = searchRepository;
    }
  
    async execute(filters: SearchFilters): Promise<SearchResult> {
      return this.searchRepository.searchMentors(filters);
    }

    async searchPosts(filters: SearchPostFilters): Promise<SearchPostResult> {
      return this.searchRepository.searchPosts(filters);
    }

    async searchMentees(filters: SearchMenteeFilters): Promise<SearchMenteeResult> {
      return this.searchRepository.searchMentees(filters);
    }
}