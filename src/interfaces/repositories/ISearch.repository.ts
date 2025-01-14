

export interface ISearchRepository{
    searchMentors(filters: SearchFilters): Promise<SearchResult>;
    searchPosts(filters: SearchPostFilters): Promise<SearchPostResult>;
    searchMentees(filters: SearchMenteeFilters): Promise<SearchMenteeResult>;
}

export interface SearchFilters {
    search?: string;
    skills?: string[];
    jobTitle?: string;
    company?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface SearchResult {
    mentors: Array<{
      id: string;
      firstName: string;
      lastName: string;
      jobTitle: string;
      company: string;
      location: string;
      skills: Array<{ id: string; name: string }>;
      profilePicture: string | null;
      rating: number;
      subscriptions: Array<{
        type: string;
        price: number;
      }>;
    }>;
    total: number;
}

export interface SearchPostFilters {
  title: string;
  page?: number;
  limit?: number;
}

export interface SearchPostResult {
  posts: any[];
  total: number;
}
  
export interface SearchMenteeFilters {
  name: string;
  page?: number;
  limit?: number;
}

export interface SearchMenteeResult {
  mentees: any[];
  total: number;
}