import { ILikedUser } from "../../entities/mentee.entity";
import { IPost, IPostLike } from "../../entities/post.entity";

export interface IPostRepository {
    createPost(data: IPost): Promise<IPost>
    editPost(data: Partial<IPost>): Promise<IPost>
    // findById(id: string): Promise<IPost | null>
    findAll(): Promise<IPost[] | null>
    userPosts(userid: string): Promise<IPost[] | null>
    deletePost(id: string): Promise<IPost | null>

    likePost(userid: string, postid: string): Promise<IPostLike>;
    unlikePost(userid: string, postid: string): Promise<any>;
    isPostLikedByUser(userid: string, postid: string): Promise<Boolean>;
    // getlikedUsers(userid: string,postid: string): Promise<ILikedUser[]>
    count(userid: string): Promise<number>
    createReport(userId: string, postId: string, reason: string): Promise<void>
}