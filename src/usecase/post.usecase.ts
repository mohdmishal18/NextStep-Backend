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

    async editPost(data: Partial<IPost>): Promise<IPost> {
        try {
            // Find the existing post by its ID or other unique identifier
            // const existingPost = await this.postRepository.findPostById(data.userid);
            // if (!existingPost) {
            //     throw new Error('Post not found');
            // }

            // Update the post with the new data
            const updatedPost = await this.postRepository.editPost(data)
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }

    async likePost(userid: string, postid: string): Promise<IPostLike> {
        try {
            const isLiked = await this.postRepository.isPostLikedByUser(
                userid,
                postid
            );
            if (!isLiked) {
                const result = await this.postRepository.likePost(userid, postid);
                return result;
            } else {
                throw new Error("Error like not Submitted");
            }
        } catch (error) {
            throw error;
        }
    }
    async unlikePost(userid: string, postid: string): Promise<any> {
        try {
            const isLiked = await this.postRepository.isPostLikedByUser(
                userid,
                postid
            );
            if (isLiked) {
                const result = await this.postRepository.unlikePost(userid, postid);
                return result;
            }

            throw new Error("Error unlike not Submitted");
        } catch (error) {
            throw error;
        }
    }


}