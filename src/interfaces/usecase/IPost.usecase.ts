import { IPost } from "../../entities/post.entity";

export interface IPostUsecase{
    createPost(data: IPost):Promise<IPost>
    getAllPosts(): Promise<IPost[] | null>
    // editPost(postid: string, caption: string): Promise<IPost>
    // deletePost(postid: string): Promise<IPost>
    // getPosts(userid: string,postid: string | null,page: number): Promise<IPost[]>
    // likePost(userid: string , postid: string): Promise<any>
    // unlikePost(userid: string , postid: string): Promise<any>
    // getUserPosts(userid: string): Promise<IPost[]>
    // getUserPostCount(userid: string): Promise<number>
}