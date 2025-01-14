import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../frameworks/middlewares/mentor.auth";
import { successResponse } from "../../frameworks/utils/response";
import { HttpStatus } from "../../enums/httpCode";
import ISubscriptionController from "../../interfaces/controller/ISubscription.controller";
import { ISubscriptionUsecase } from "../../interfaces/usecase/ISubscription.usecase";
import { ISubscription } from "../../entities/subscription.entity";
import { IJwtPayload } from "../../interfaces/usecase/IMentee.usercase";
import mongoose from "mongoose";

export default class SubscriptionController implements ISubscriptionController {
    private subscriptionUsecase;

    constructor(subscriptionUsecase: ISubscriptionUsecase){
        this.subscriptionUsecase = subscriptionUsecase
    }

    fetch = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req.user as IJwtPayload
            const subscriptions = await this.subscriptionUsecase.fetch(user.userId)
            res.status(HttpStatus.OK).json(successResponse(subscriptions,"feched blog Successfully."))
        } catch (error) {
            next(error)
        }
    }

    create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: ISubscription = req.body;
            const user = req.user as IJwtPayload
            data.mentorId = new mongoose.Types.ObjectId(user.userId);
            const createdSubscription = await this.subscriptionUsecase.create(data)
            res.status(HttpStatus.CREATED).json(successResponse(createdSubscription, "Blog created Successfully"))
        } catch (error) {
            next(error)
        }
    }

    edit = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            // const {  } = req.body;
            console.log(id, req.body,"data and id in the controller")
            const blog = await this.subscriptionUsecase.edit(id, req.body)
            res.status(HttpStatus.OK).json(successResponse(blog,"edited blog Successfully."))
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            const blog = await this.subscriptionUsecase.delete(id)
            res.status(HttpStatus.OK).json(successResponse(blog,"deleted subscription successfully"))
        } catch (error) {
            next(error)
        }
    }
}