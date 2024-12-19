import { IBlog } from "../../entities/blog.entity"; 

export interface IBlogRepository{
    fetch(): Promise<IBlog[]>
    create(data: IBlog): Promise<IBlog>
    fetchById(blogId: string): Promise<IBlog>
    edit(blogId: string, data: Partial<IBlog>): Promise<IBlog>
}