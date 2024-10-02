
import IMentee from "../../entities/mentee.entity"
import IFollow from "../../entities/follow.entity"

export interface IFollowRepository{
    addFollow(followerid: string, followingid: string): Promise<IFollow>
    deleteFollow(followerid: string, followingid: string): Promise<IFollow>
    getFollower(userid: string): Promise<IFollow[]>
    getFollowing(userid: string): Promise<IFollow[]>
    isUserFollowingMe(userid: string, followingid: string): Promise<boolean>
    isUserFollowing(userid: string, followingid: string): Promise<boolean>
    getFollowcount(userid: string): Promise<any>
    // getFollowingUsers(searchData: IFollowingSearch): Promise<IMentee[]>
    
}