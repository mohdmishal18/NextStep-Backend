import { IPost } from "../../entities/post.entity";

export interface IPostUsecase{
    createPost(data: IPost):Promise<IPost>
    getAllPosts(): Promise<IPost[] | null>
    userPosts(userid: string): Promise<IPost[] | null>
    deletePost(id: string): Promise<IPost | null>
    editPost(data: Partial<IPost>):Promise<IPost>
    likePost(userid: string , postid: string): Promise<any>
    unlikePost(userid: string , postid: string): Promise<any>   
}