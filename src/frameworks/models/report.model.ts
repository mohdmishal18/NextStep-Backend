import mongoose from "mongoose";
import { IReport } from "../../entities/post.entity";

const ReportSchema = new mongoose.Schema<IReport>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users' // Assuming you have a Users model for user references
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post' // Assuming you have a Posts model for post references
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ReportModel = mongoose.model<IReport>('Report', ReportSchema);
export default ReportModel;
