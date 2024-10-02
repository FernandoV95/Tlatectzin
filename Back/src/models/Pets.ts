import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { IPetImg } from "./PetsImg";

export interface IPets extends Document {
    alias: string,
    tipo: string,
    vacunas: string[],
    shortDesc: string,
    longDesc: string,
    imagenes: PopulatedDoc<IPetImg & Document>[]
}

const petSchema: Schema = new Schema({
    alias: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    vacunas: [{
        type: String,
        required: true
    }],
    shortDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String,
        required: true
    },
    imagenes: [{
        type: Types.ObjectId,
        ref: 'petsImg'
    }]
}, { timestamps: true })

const Pets = mongoose.model<IPets>('pets', petSchema)
export default Pets