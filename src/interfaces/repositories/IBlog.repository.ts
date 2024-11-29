import { IBlog } from "../../entities/blog.entity"; 

export interface IBlogRepository{
    create(data: IBlog): Promise<IBlog>
}