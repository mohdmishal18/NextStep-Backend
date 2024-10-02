import mongoose, {Model} from "mongoose";
import { IFollowRepository } from "../interfaces/repositories/IFollow.repository";
import IFollow from "../entities/follow.entity";
import IMentee from "../entities/mentee.entity";



export default class FollowRepository implements IFollowRepository {
  private follow: Model<IFollow>;

  constructor(follow: Model<IFollow>) {
    this.follow = follow
  }

    async getFollowcount(userid: string): Promise<any> {
        try {
            const followingCount = await this.follow.countDocuments({ follower_id: userid });
            const followersCount = await this.follow.countDocuments({ following_id: userid });

            return { followingCount, followersCount }
        } catch (error) {
            throw error
        }
    }

    async isUserFollowing(userid: string, followingid: string): Promise<boolean> {

        const following = await this.follow.findOne({
            follower_id: userid,
            following_id: followingid
        })
        return !!following
    }

    async isUserFollowingMe(userid: string, followingid: string): Promise<boolean> {
        
        const followingMe = await this.follow.findOne({
            follower_id: followingid,
            following_id: userid
        })

        return !!followingMe
    }



    async getFollower(userid: string): Promise<IFollow[]> {
        try {
            const followers = await this.follow.find({ following_id: userid })
            return followers
        } catch (error) {
            throw error
        }

    }

    async getFollowing(userid: string): Promise<IFollow[]> {
        try {
            const following = await this.follow.find({ follower_id: userid }).select('following_id');

            return following
        } catch (error) {
            throw error
        }

    }

    async addFollow(followerid: string, followingid: string): Promise<IFollow> {
        const newFollow = new this.follow({
            follower_id: followerid,
            following_id: followingid
        })

        const saved = await newFollow.save()
        return saved
    }

    async deleteFollow(followerid: string, followingid: string): Promise<any> {
        try {
            const deleted = await this.follow.findOneAndDelete({ follower_id: followerid, following_id: followingid });
            return deleted
        } catch (error) {
            throw error
        }

    }

}