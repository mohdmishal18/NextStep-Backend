import { Model } from "mongoose";
import { IPostRepository } from "../interfaces/repositories/IPost.repository";
import { IPost } from "../entities/post.entity";

export default class PostRepository implements IPostRepository {
  private post: Model<IPost>;

  constructor(post: Model<IPost>) {
    this.post = post;
  }

  async createPost(data: IPost): Promise<IPost> {
    try {
      const newPost = new this.post(data);
      return await newPost.save()
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IPost[] | null> {
    try {
  
      // Find posts with pagination and populate user and tags
      const posts = await this.post.find().sort({_id: -1})
        .populate({
          path: 'userid',  // Populate the user details
          select: 'name email profilePicture',  // Fields from the user document to include
        })
        .populate({
          path: 'tags',  // Populate the tags
          select: 'name',  // Fields from the tag document to include
        })
        .exec();  // Execute the query


        console.log(posts, "posts in the repository")
  
      return posts;
    } catch (error) {
      console.error('Error finding posts:', error);
      return null;
    }
  }

  
}
