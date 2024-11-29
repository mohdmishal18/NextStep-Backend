import { Model } from "mongoose";
import { IBlogRepository } from "../interfaces/repositories/IBlog.repository";
import { IBlog } from "../entities/blog.entity";

export default class BlogRepository implements IBlogRepository {
  private blog: Model<IBlog>;

  constructor(blog: Model<IBlog>) {
    this.blog = blog;
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
}
