import { IBlog } from "../entities/blog.entity";
import { IBlogUsecase } from "../interfaces/usecase/IBlog.usecase";
import { IBlogRepository } from "../interfaces/repositories/IBlog.repository";

export default class BlogUsecase implements IBlogUsecase {
  
    private blogRepository: IBlogRepository

    constructor(blogRepository: IBlogRepository) {
        this.blogRepository = blogRepository
    }

    async fetch(): Promise<IBlog[]> {
        try {
            const blogs = await this.blogRepository.fetch()
            return blogs
        } catch (error) {
            throw error
        }
    }

    async create(data: IBlog): Promise<IBlog> {
        try {
            const blog = await this.blogRepository.create(data)
            return blog
        } catch (error) { 
            throw error
        }
    }

    async fetchById(blogId: string): Promise<IBlog> {
        try {
            const blog = await this.blogRepository.fetchById(blogId)
            return blog
        } catch (error) {
            throw error
        }
    }

    async edit(blogId: string, data: Partial<IBlog>): Promise<IBlog> {
        try {
            const blog = await this.blogRepository.edit(blogId, data)
            return blog
        } catch (error) {
            throw error
        }
    }

}