import { IPost } from "../../entities/post.entity";
import { IReport } from "../../entities/post.entity";
export interface IPostUsecase{
    createPost(data: IPost):Promise<IPost>
    getAllPosts(): Promise<IPost[] | null>
    userPosts(userid: string): Promise<IPost[] | null>
    deletePost(id: string, publicId: string): Promise<IPost | null>
    editPost(data: Partial<IPost>):Promise<IPost>
    likePost(userid: string , postid: string): Promise<any>
    unlikePost(userid: string , postid: string): Promise<any>   
    reportPost(userId: string, postId: string, reason: string): Promise<void>
    hidePost(postid: string, status: boolean): Promise<void>
    getReports(): Promise<IReport[] | null>
}