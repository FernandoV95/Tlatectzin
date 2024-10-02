import mongoose, { Document, mongo, Schema } from "mongoose";

interface IVeterinary extends Document {
    nombres: string
    apPat: string
    apMat: string
    cedula: string
    telefono: number
    email: string
    pass: string
    confirmed: boolean
}

export const VeterinarySchema: Schema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apPat: {
        type: String,
        required: true
    },
    apMat: {
        type: String
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        default:"12345"
    },
    confirm: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Veterinarios = mongoose.model<IVeterinary>('veterinarys', VeterinarySchema)
export default Veterinarios