import mongoose from "mongoose";
import { ISkill } from "../../entities/admin.entity";

const SkillSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    isListed: {
        type: Boolean,
        required: true,
        default: true
    }
},{ timestamps: true })

const SkillModel = mongoose.model<ISkill>('Skills', SkillSchema)
export default SkillModel