import mongoose,{Document, mongo, Schema,Types} from "mongoose";


export interface IPetImg extends Document{
    petId: Types.ObjectId
    public_id: string;
    secure_url: string;
}

const petImgSchema:Schema = new Schema({
    petId:{
        type:Types.ObjectId,
        ref:'pets'
    },
    public_id:{
        type:String
    },
    secure_url:{
        type:String
    }

})

const PetImgs = mongoose.model<IPetImg>('petsImg',petImgSchema)
export default PetImgs