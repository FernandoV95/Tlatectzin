import mongoose, { Document, mongo, Schema } from "mongoose";

interface IVeterinary extends Document {
    nombres: string
    apPat: string
    apMat: string
    tel: number
    email: string
    pass: string
    confirmed: boolean
    cedula: string
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
        default:"hola"
    },
    confirmed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Veterinarios = mongoose.model<IVeterinary>('veterinarys', VeterinarySchema)
export default Veterinarios