import { IBlog } from "../../entities/blog.entity";

export interface IBlogUsecase {
    fetch():Promise<IBlog[]>
    create(data: IBlog):Promise<IBlog>
    fetchById(blogId: string): Promise<IBlog>
}