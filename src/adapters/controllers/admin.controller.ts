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
        this.listSkill = this.listSkill.bind(this)
        this.editSkill = this.editSkill.bind(this)
        this.getAllApplication = this.getAllApplication.bind(this)
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
           console.log(newSkill, "res for add skill from use case")
           res.status(201).json({ status: true,skill: newSkill });

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                res.status(400).json({ message: error.message || "An unexpected error occurred" });
              } else {
                res.status(400).json({ message: "An unexpected error occurred" });
              }
        }
    }

    async editSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id , name} = req.body
            const edited = await this.adminUsecase.editSkill(id , name)
            res.status(201).json({status: true, editedSkill: edited})
        } catch (error) {
            console.log(error)
        }
    }

    async listSkill(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id, status} = req.body
            console.log(req.body)
            const response = await this.adminUsecase.listSkill(id , status)
            res.status(201).json({status: true, skill: response})
        } catch (error) {
            console.log(error)
        }
    }

    async getAllApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mentors = await this.adminUsecase.getAllApplications()
            res.status(200).json({ mentors })
        } catch (error) {
            console.log(error);
            
        }
    }

}