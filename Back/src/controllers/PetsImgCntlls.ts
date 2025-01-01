import type { Request, Response } from "express";
import PetImgs from "../models/PetsImg";
import { dltImg, upldImg } from "../config/cloudinary";
import fs from "fs-extra";
import Pets from "../models/Pets";
import PetsImg from "../models/PetsImg";

export class petsImgControllers {

     //Traer todas las imagenes de la mascota correspondiente
    static getAllImgByPetID = async (req: Request, res: Response) => {
        try {
            let imgs = [];
            //req.pet.imagenes <- Aqui estan almacenadas sus imagenes
            if (!req.pet.imagenes) {
                const error = new Error('No hay imagenes')
                res.status(404).json({ error: error.message })
                return
            }


            for (const i of req.pet.imagenes) {
                const srchImg = await PetImgs.findById(i.toString());
                imgs = [...imgs, srchImg]
            }

            res.status(200).json({ imgs })


        } catch (error) {
            res.status(500).send(error.message)
            return
        }
    }

    //Agrega imagenes nuevas a la mascota
    static addImgPet = async (req: Request, res: Response) => {
        try {
            // Accede a los archivos enviados bajo el campo 'imagenes'
            const imagenes = req.files?.imagenes;  //Obtiene los datos de las imagenes

            let tempFilePaths = Array.isArray(imagenes) //Obtiene la direccion temp de la imagen(es)
                ? imagenes.map(img => img.tempFilePath)
                : imagenes ? [imagenes.tempFilePath] : [];

            let successfulUploads = 0;
            let failedUploads = 0;

            for (const i of tempFilePaths) {
                try {
                    if (imagenes) {
                        const newImgnPet = new PetImgs();

                        // Almacenamos el id de la mascota en sus imágenes correspondientes
                        newImgnPet.petId = req.pet.id;

                        //Colamos las imagenes
                        req.pet.imagenes = req.pet.imagenes ? [...req.pet.imagenes, newImgnPet.id] : [newImgnPet.id];

                        // Esta es la función que sube las imágenes al Cloudinary
                        const aux = await upldImg(i);

                        // Almacenamos los datos que requerimos en la BD
                        newImgnPet.public_id = aux.public_id;
                        newImgnPet.secure_url = aux.secure_url;

                        // Eliminamos las imágenes locales y guardamos los datos en la BD
                        await Promise.allSettled([fs.unlink(i), newImgnPet.save(), req.pet.save()]);

                        successfulUploads++; // Aumento si la imagen se sube correctamente
                    }
                } catch (error) {
                    console.error('Error al procesar la imagen:', error);
                    failedUploads++; // Aumento si ocurre un error en la subida de la imagen
                }
            }

            // Respuesta final con control de errores
            if (failedUploads > 0) {
                res.status(500).send(`Algunas imágenes no se subieron correctamente. Errores: ${failedUploads}`);
            } else {
                res.status(201).send('Imagenes Guardadas 😊');
            }

        } catch (error) {
            console.error('Error general en el proceso:', error);
            res.status(500).send('Hubo un error al procesar las imágenes.');
        }
    };



    //Borra una solo imagen de la mascota por su id 
    static deleteImgPetById = async (req: Request, res: Response) => {
        try {
            //Busca la imagen mediante su id
            const { idIP } = req.params
            const shcImg = await PetImgs.findById(idIP)

            if (!shcImg) {
                res.status(404).json({ error: 'Imagen no encontrada' });
                return
            }

            //Verficamos si el id de la mascota almacenanada en PetsImg
            //es igual al que pasamos por parametro
            if (shcImg.petId.toString() !== req.pet.id) {
                const error = new Error('Accion no valida')
                res.status(403).json({ error: error.message })
                return
            }

            //Eliminamos la referencia de imagen de Pets
            req.pet.imagenes = req.pet.imagenes.filter(i => i.toString() != idIP)

            //Guardamos cambios
            await Promise.allSettled([shcImg.deleteOne(), dltImg(shcImg.public_id), req.pet.save()])

            res.status(200).send('Imagen Eliminada')

        } catch (error) {
            res.status(500).send(error.message)
            return
        }
    }

    //Borra todas las imagenes de la mascota
    static deleteAllImg = async (req: Request, res: Response) => {
        try {
            //Vamos a borrar todo asi que no necesitamos los ids

            //Buscamos los id de las imagenes que estan en Pets
            const { idPet } = req.params
            const shcImg = await Pets.findById(idPet)

            //Verificamos si la mascota esta registrada
            if (!shcImg) {
                const error = new Error('Mascota No registrada')
                res.status(404).json({ error: error.message })
                return
            }

            //verificar si hay imagenes
            if (shcImg.imagenes.length < 1) {
                const error = new Error('No hay imagenes')
                res.status(404).json({ error: error.message })
                return
            }

            for (const i of shcImg.imagenes) {
                //i.toString() -> es el id de la imagen

                //Buscamos las imagenes en Pets
                const imgpet = await PetsImg.findById(i.toString())
                //Boramos la referencia de las PetsImgn en Pets
                req.pet.imagenes = req.pet.imagenes.filter(imgn => imgn.toString() != i.toString())
                //Boramos las imagenes de PetsImg 
                //Boramos las imagenes de couldinary dltImg(shcImg.public_id)

                await Promise.allSettled([imgpet.deleteOne(), dltImg(imgpet.public_id), req.pet.save()])
            }

            res.status(200).send('Hasta qui todo bien UwU')
        } catch (error) {
            res.status(500).send(error.message)
            return
        }
    }
}