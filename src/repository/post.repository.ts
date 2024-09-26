import { Model } from "mongoose";
import { IPostRepository } from "../interfaces/repositories/IPost.repository";
import { IPost } from "../entities/post.entity";
import { IPostLike } from "../entities/post.entity";

export default class PostRepository implements IPostRepository {
  private post: Model<IPost>;
  private like: Model<IPostLike>
  constructor(post: Model<IPost>, like: Model<IPostLike>) {
    this.post = post;
    this.like = like
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

  async userPosts(userid: string): Promise<IPost[] | null> {
    try {
      // Find posts where the userId matches the provided userid
      const posts = await this.post.find({ userid: userid }).sort({ _id: -1 })
        .populate({
          path: 'userid',  // Populate the user details
          select: 'name email profilePicture',  // Fields from the user document to include
        })
        .populate({
          path: 'tags',  // Populate the tags
          select: 'name',  // Fields from the tag document to include
        })
        .exec();  // Execute the query

      return posts;
    } catch (error) {
      console.error('Error finding user posts:', error);
      return null;
    }
  }

  // Method to delete a post by its ID
  async deletePost(postId: string): Promise<IPost | null> {
    try {
      // Find the post by ID and remove it
      const deletedPost = await this.post.findByIdAndDelete(postId).exec();
      
      if (!deletedPost) {
        console.error('Post not found:', postId);
        return null;
      }

      return deletedPost;
    } catch (error) {
      console.error('Error deleting post:', error);
      return null;
    }
  }

  async editPost(data: Partial<IPost>): Promise<IPost> {
    try {
        const postId = data._id; // Extract postId from data
        if (!postId) {
            throw new Error('Post ID is required for updating');
        }

        // Remove postId from data before updating
        const { _id, ...updateData } = data;

        // Find the post by ID and update it with the new data
        const updatedPost = await this.post.findByIdAndUpdate(postId, updateData, {
            new: true,  // Return the updated document
            runValidators: true  // Run schema validation
        }).exec();

        if (!updatedPost) {
            // Handle case where post is not found
            throw new Error(`Post not found: ${postId}`);
        }

        // Type assertion to convert the document to IPost
        return updatedPost.toObject() as IPost;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
 }

 async count(userid: string): Promise<number> {
  try {
    const postCount = await this.post.countDocuments({userid:userid}) 
    return postCount
  } catch (error) {
    throw error
  }

}

async isPostLikedByUser(userid: string, postid: string): Promise<Boolean> {

  const liked = await this.post.findOne({ post_id: postid, user_id: userid });

  return !!liked
}

async likePost(userid: string, postid: string): Promise<any> {
  try {
    const like = new this.like({
      post_id: postid, user_id: userid
    })
    await like.save()

    await this.post.updateOne({ _id: postid }, { $inc: { likes: 1 } })
    return like

  } catch (error) {
    throw error
  }
}

async unlikePost(userid: string, postid: string): Promise<any> {
  try {

    const dislike = await this.post.findOneAndDelete({
      post_id: postid, user_id: userid
    })
    await this.post.updateOne({ _id: postid }, { $inc: { likes: -1 } })

    return dislike


  } catch (error) {
    throw error
  }
}


  
}
