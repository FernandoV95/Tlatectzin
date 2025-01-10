import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./Users";
const meetingStatus = {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'EnProgreso',
    COMPLETED: 'Completado',
    CANCELED: 'Cancelada',
} as const
export type MeetingStatus = typeof meetingStatus[keyof typeof meetingStatus]

export interface IMeeting extends Document {
    N_cita: number
    alias: string
    fecha: string
    hora: string
    motivo: string
    comentarios: string
    status: MeetingStatus
    usuario: PopulatedDoc<IUser & Document>
    veterinario: PopulatedDoc<IUser & Document>
    start: string
    end: string
}

const MeetingSchema: Schema = new Schema({
    N_cita: {
        type: Number,
        required: true,
        unique: true,
    },
    alias: {
        type: String,
    },
    fecha: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    comentarios: {
        type: String
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    usuario: {
        type: Types.ObjectId,
        ref: 'user'
    },
    veterinario: {
        type: Types.ObjectId,
        ref: 'user',
        default: null 
    },

    status: {
        type: String,
        enum: Object.values(meetingStatus),
        default: meetingStatus.PENDING
    },
}, { timestamps: true }
)

const Meeting = mongoose.model<IMeeting>('meeting', MeetingSchema)
export default Meeting