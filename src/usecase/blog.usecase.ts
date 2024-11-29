import { IBlog } from "../entities/blog.entity";
import { IBlogUsecase } from "../interfaces/usecase/IBlog.usecase";
import { IBlogRepository } from "../interfaces/repositories/IBlog.repository";
import { error } from "console";

export default class BlogUsecase implements IBlogUsecase {
  
    private blogRepository: IBlogRepository

    constructor(blogRepository: IBlogRepository) {
        this.blogRepository = blogRepository
    }

    async create(data: IBlog): Promise<IBlog> {
        try {
            const blog = await this.blogRepository.create(data)
            return blog
        } catch (error) { 
            throw error
        }
    }

}