import { IPost, IPostLike } from "../entities/post.entity";
import { IPostRepository } from "../interfaces/repositories/IPost.repository";
import { IPostUsecase } from "../interfaces/usecase/IPost.usecase";

export default class PostUsecase implements IPostUsecase {
    private postRepository: IPostRepository

    constructor(
        postRepository: IPostRepository
    ) {
        this.postRepository = postRepository
    }

    async createPost(data: IPost): Promise<IPost> {
        try {
            const post = await this.postRepository.createPost(data)
            return post;
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(): Promise<IPost[] | null> {
        try {
            return await this.postRepository.findAll()
        } catch (error) {
            throw error;
        }
    }

    async userPosts(userid: string): Promise<IPost[] | null> {
        try {
            return await this.postRepository.userPosts(userid)
        } catch (error) {
            throw error;
        }
    }

    async deletePost(id: string): Promise<IPost | null> {
        try {
            return await this.postRepository.deletePost(id)
        } catch (error) {
            throw error;
        }
    }
}