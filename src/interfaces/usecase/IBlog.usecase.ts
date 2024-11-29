import { IBlog } from "../../entities/blog.entity";

export interface IBlogUsecase {
    create(data: IBlog):Promise<IBlog>
}