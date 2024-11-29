import { Container } from "inversify";

//blog imports
import { IBlogUsecase } from "../../interfaces/usecase/IBlog.usecase";
import BlogUsecase from "../../usecase/blog.usecase";
import { IBlogRepository } from "../../interfaces/repositories/IBlog.repository";
import BlogRepository from "../../repository/blog.repository";
import BlogController from "../../adapters/controllers/blog.controller";
import { BlogModel } from "../models/blog.model";

// A separate file to define all the constants
import { TYPES } from "./types"; 

// Create the container
const container = new Container();

//Blog dependencies registration
container.bind<IBlogRepository>(TYPES.IBlogRepository).toDynamicValue(() => {
    return new BlogRepository(BlogModel); 
}).inSingletonScope();
container.bind<IBlogUsecase>(TYPES.IBlogUsecase).to(BlogUsecase).inSingletonScope();
container.bind<BlogController>(TYPES.BlogController).to(BlogController);

export { container };