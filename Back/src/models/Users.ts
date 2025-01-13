import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";

const rol = {
    USER: 'usuario',
    VETERINARY: 'veterinario',
    ADMIND: 'administrador',
} as const

export type Rol = typeof rol[keyof typeof rol]

export interface IUser extends Document {
    nombres: string
    apPat: string
    apMat: string
    tel: string
    email: string
    pass: string
    universidad?: string
    cedula?: string
    rol: Rol
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
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    universidad: {
        type: String,
    },
    cedula: {
        type: String,
    },
    rol: {
        type: String,
        enum: Object.values(rol),
        default: rol.USER
    },
    confirmed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true }
)

const User = mongoose.model<IUser>('user', UserSchema)
export default User