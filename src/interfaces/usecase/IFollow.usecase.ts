import IFollow from "../../entities/follow.entity"
import IMentee from "../../entities/mentee.entity"
export interface getFollowUnFollowstatusRes {
    userFollowing: Boolean
    userFollowingMe:Boolean
}

export interface IFollowUsecase{
    follow(followerid:string,followingid: string): Promise<IFollow>
    unfollow(followerid:string,followingid: string): Promise<IFollow>
    getFollowersCount(userid: string): Promise<any>
    getFollowUnFollowstatus(userid: string, followingid: string): Promise<{ userFollowing: boolean, userFollowingMe: boolean }>
    // getFollowings(searchData: IFollowingSearch): Promise<IMentee[]>
}