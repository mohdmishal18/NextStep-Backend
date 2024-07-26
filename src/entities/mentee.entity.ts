import { Document } from "mongoose";

export default interface IMentee {
    name: string;
    email: string;
    phone: Number;
    password: string;
}