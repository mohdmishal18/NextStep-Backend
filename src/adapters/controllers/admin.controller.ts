import { Request, Response, NextFunction } from "express";

import IAdminController from "../../interfaces/controller/IAdmin.controller";
import IAdminUsecase from "../../interfaces/usecase/IAdmin.usecase";
import { CommonCode } from "../../enums/commonCodes";
export default class AdminController implements IAdminController {
    
    private adminUsecase;

    constructor(adminUsecase: IAdminUsecase) {
        this.adminUsecase = adminUsecase;
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.getAllSkills = this.getAllSkills.bind(this)
        this.addSkill = this.addSkill.bind(this)
    }

    async login(req: Request, res: Response): Promise<void> {
        
        try {
            
            const { email , password } = req.body
            
            const response = await this.adminUsecase.login(email , password)
            
            if(response?.message === 'Invalid Email') {
                res.status(403).json({ message: 'Invalid Email'})
            }

            if(response?.message === 'Incorrect Password') {
                res.status(403).json({ message: 'Incorrect Password' })
            }

            if(response?.message === 'Login Successfull') {
                res.cookie(CommonCode.ADMIN_ACCESS_TOKEN , response.adminAccessToken, {
                    httpOnly: true,
                    maxAge: 3600000
                })
                .cookie(CommonCode.ADMIN_REFRESH_TOKEN, response.adminRefreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })

                res.status(200).json({ status: true, message: 'Login Successfull' })
                console.log('log in success')
            }

        } catch (error) {
            console.log(error)
        }
    }

    async logout(req: Request, res: Response): Promise<void> {

        try {

            res.clearCookie(CommonCode.ADMIN_REFRESH_TOKEN, { httpOnly: true })
            res.status(200).json({ status: true })

        } catch (error) {
            console.log(error)
        }
    }

    async getAllSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            const skills = await this.adminUsecase.getAllSkills()
            
            res.status(200).json({ skills })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async addSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.body

           const newSkill = await this.adminUsecase.addSkill(name)
           res.status(201).json({ skill: newSkill });

        } catch (error) {
            
        }
    }
}