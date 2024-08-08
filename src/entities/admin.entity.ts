import { Document } from "mongoose"

export default interface IAdmin extends Document {
    _id : string
    name : string
    email : string
    password : string
    profilePicture: string
}