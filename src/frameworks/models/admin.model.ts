import mongoose, { Schema, Document, Model } from "mongoose";
import IAdmin from "../../entities/admin.entity";

// Explicitly defining the schema using the IAdmin interface
const AdminSchema: Schema<IAdmin> = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    }
    
});

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>('Admins', AdminSchema);

export default AdminModel;