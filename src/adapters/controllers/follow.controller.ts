import { NextFunction, Request, Response } from "express";

import IFollowController from "../../interfaces/controller/IFollow.controller";
import { IFollowUsecase } from "../../interfaces/usecase/IFollow.usecase";
import { IJwtPayload } from "../../interfaces/usecase/IMentee.usercase";

export default class FollowController implements IFollowController {
    private followUsecase

    constructor(followUsecase: IFollowUsecase) {
        this.followUsecase = followUsecase
        this.followAccount = this.followAccount.bind(this)
        this.unfollowAcccount = this.unfollowAcccount.bind(this)
        this.getFollowCount = this.getFollowCount.bind(this)
        this.getFollowUnFollowstatus = this.getFollowUnFollowstatus.bind(this)
    }

    async followAccount(req: Request, res: Response, next: NextFunction){
        try {
            const {userid,followingid} = req.body;
            const followerid = userid
            const result = await this.followUsecase.follow(followerid,followingid);
            
            res.status(200).json({status:"success",data:result})
        } catch (error) {
            next(error)
        }
    }

    async unfollowAcccount(req: Request, res: Response, next: NextFunction){
        try {
            const { userid,followingid} = req.body;
            const followerid = userid
            const result = await this.followUsecase.unfollow(followerid,followingid);
            res.status(200).json({status:"success",data:result})
        } catch (error) {
            next(error)
        }
    }

    async getFollowCount(req: Request, res: Response, next: NextFunction){
        try {
            const {userid} = req.body
            const result = await this.followUsecase.getFollowersCount(userid);

            res.status(200).json({status:'success',data:result})
        } catch (error) {
            next(error)
        }
    }

    async getFollowUnFollowstatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userid,followingid} = req.body;
            const result = await this.followUsecase.getFollowUnFollowstatus(userid, followingid)
            res.status(200).json({staus: 'success', data: result})
        } catch (error) {
            
        }
    }

}