import { SearchFilters, SearchMenteeFilters, SearchMenteeResult, SearchPostFilters, SearchPostResult, SearchResult } from "../repositories/ISearch.repository";

export interface ISearchUsecase {
    execute(filters: SearchFilters): Promise<SearchResult>;
    searchPosts(filters: SearchPostFilters): Promise<SearchPostResult>;
    searchMentees(filters: SearchMenteeFilters): Promise<SearchMenteeResult>;
}