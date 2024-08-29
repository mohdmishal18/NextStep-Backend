import { IPost, IPostLike } from "../../entities/post.entity";
import { ILikedUser } from "./IMentee.repository";

export interface IPostRepository {
    createPost(data: IPost): Promise<IPost>
    // update(id: string, data: Partial<IPost>): Promise<IPost | null>
    // findById(id: string): Promise<IPost | null>
    findAll(): Promise<IPost[] | null>
    // findOne(postId: string): Promise<IPost>
    // likePost(userid: string, postid: string): Promise<IPostLike>;
    // unlikePost(userid: string, postid: string): Promise<any>;
    // isPostLikedByUser(userid: string, postid: string): Promise<Boolean>;
    // getlikedUsers(userid: string,postid: string): Promise<ILikedUser[]>
    // count(userid: string): Promise<number>
}