import { Document } from "mongoose"

export default interface IAdmin extends Document {
    _id : string
    name : string
    email : string
    password : string
    profilePicture: string
}

export interface ISkill extends Document {
    _id: string,
    name: string,
    isListed: boolean
}

interface mishal {
    name: string,
    passwor
}