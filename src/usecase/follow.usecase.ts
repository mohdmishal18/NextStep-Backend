import IFollow from "../entities/follow.entity";
import IMentee from "../entities/mentee.entity";
import { IFollowRepository } from "../interfaces/repositories/IFollow.repository";
import { IFollowUsecase } from "../interfaces/usecase/IFollow.usecase";

export default class FollowUsecase implements IFollowUsecase {
    private followRepository: IFollowRepository

    constructor(followRepository: IFollowRepository) {
        this.followRepository = followRepository
    }

    async getFollowersCount(userid: string): Promise<any> {
        try {
            const result = await this.followRepository.getFollowcount(userid);
            console.log("count in the usecase",result)
            return result
        } catch (error) {
            throw error
        }
    }

    async getFollowUnFollowstatus(userid: string, followingid: string): Promise<{ userFollowing: boolean; userFollowingMe: boolean; }> {
        try {
            const userFollowing = await this.followRepository.isUserFollowing(userid, followingid);
            const userFollowingMe = await this.followRepository.isUserFollowingMe(userid, followingid);
    
            return { userFollowing, userFollowingMe };
        } catch (error) {
            console.error("Error in getting follow status:", error);
            throw error; // or handle the error as needed
        }
    }



    async follow(followerid: string, followingid: string): Promise<IFollow> {
        try {
            const result = await this.followRepository.addFollow(followerid,followingid);
            
            return result
        } catch (error) {
            throw error
        }
    }

    async unfollow(followerid: string, followingid: string): Promise<IFollow> {
        try {
            const deleted = await this.followRepository.deleteFollow(followerid,followingid);
            return deleted
        } catch (error) {
            throw error
        }
    }
}
