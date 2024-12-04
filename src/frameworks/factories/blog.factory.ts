import BlogController from '../../adapters/controllers/blog.controller';
import BlogUsecase from '../../usecase/blog.usecase';
import BlogRepository from '../../repository/blog.repository';
import { BlogModel } from '../models/blog.model';

export function createBlogController(): BlogController {
    const blogRepository = new BlogRepository(BlogModel);
    const blogUsecase = new BlogUsecase(blogRepository);
    return new BlogController(blogUsecase);
}