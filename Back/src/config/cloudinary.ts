import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure:true
});

//Funcion para Almacenar imagen en couldinary
export const upldImg = async (filePath: string)  => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'tlatectzinc'  //Nombre de la carpeta en couldbinary
        });
        return result;  
    } catch (error) {
        console.error('No se almacenaron las imagenes', error);
        throw error;  
    }
};

//Funcion para eliminar imagenes en couldinary
export const dltImg = async (public_id: string)  => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;  
    } catch (error) {
        console.error('No se borraron las imagenes', error);
        throw error;  
    }
}
