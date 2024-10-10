import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";


export interface IUser extends Document {
    nombres: string
    apPat: string
    apMat: string
    tel: number
    email: string
    pass: string
    confirmed: boolean
}

const UserSchema: Schema = new Schema({
    nombres: {
        type: String,
        required: true, 
    },
    apPat: {
        type: String,
        required: true
    },
    apMat: {
        type: String
    },
    tel: {
        type:Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    pass: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
},{ timestamps: true }
)

const User = mongoose.model<IUser>('user', UserSchema)
export default User