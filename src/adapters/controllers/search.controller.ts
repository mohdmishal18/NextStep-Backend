import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../frameworks/utils/response";
import { HttpStatus } from "../../enums/httpCode";
import { ISearchUsecase } from "../../interfaces/usecase/ISearch.usecase";
import ISearchController from "../../interfaces/controller/ISearch.controller";
import { SearchFilters, SearchMenteeFilters, SearchPostFilters } from "../../interfaces/repositories/ISearch.repository";

export default class SearchController implements ISearchController {
    private searchUsecase: ISearchUsecase;
  
    constructor(searchUsecase: ISearchUsecase) {
      this.searchUsecase = searchUsecase;
    }
  
    searchMentors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const filters: SearchFilters = {
            search: req.query.search as string,
            skills: req.query.skills ? (req.query.skills as string).split(',') : undefined,
            jobTitle: req.query.jobTitle as string,
            company: req.query.company as string,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10
          };
    
          const result = await this.searchUsecase.execute(filters);
          res.status(HttpStatus.OK).json(successResponse(result, "Mentors fetched successfully"));
        } catch (error) {
          next(error);
        }
    }


    searchPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const filters: SearchPostFilters = {
              title: req.query.title as string,
              page: req.query.page ? Number(req.query.page) : 1,
              limit: req.query.limit ? Number(req.query.limit) : 10
          };

          const result = await this.searchUsecase.searchPosts(filters);
          res.status(HttpStatus.OK).json(successResponse(result, "Posts fetched successfully"));
      } catch (error) {
          next(error);
      }
  }

  searchMentees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const filters: SearchMenteeFilters = {
            name: req.query.name as string,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 5
        };

        const result = await this.searchUsecase.searchMentees(filters);
        res.status(HttpStatus.OK).json(successResponse(result, "Mentees fetched successfully"));
    } catch (error) {
        next(error);
    }
}

  }