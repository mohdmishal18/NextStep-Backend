import { Model } from "mongoose";
import { IBlogRepository } from "../interfaces/repositories/IBlog.repository";
import { IBlog } from "../entities/blog.entity";

export default class BlogRepository implements IBlogRepository {
  private blog: Model<IBlog>;

  constructor(blog: Model<IBlog>) {
    this.blog = blog;
  }

  async fetch(): Promise<IBlog[]> {
    try {
      const blogs = await this.blog.find()
      return blogs
    } catch (error) {
      console.log("error while fetching blogs", error)
      throw new Error("failed to fetch blogs")
    }
  }

  async create(data: IBlog): Promise<IBlog> {
    try {

      const newBlog = await new this.blog(data);
      const saveBlog = await newBlog.save();

      return saveBlog

    } catch (error) {

        console.log("error creating the blog", error)
        throw new Error("failed to create blog")

    }
  }

  async fetchById(blogId: string): Promise<IBlog> {
    try {
      const blog = await this.blog
        .findById(blogId)
        .populate({
          path: 'tags',
          select: 'name'
        }); // Populates the tags field with related documents
      return blog as IBlog;
    } catch (error) {
      console.log("Error in fetching blog", error);
      throw new Error("Failed to fetch the blog");
    }
  }
  
}
