import type { Request, Response } from "express";
import PetImgs from "../models/PetsImg";
import { dltImg, upldImg } from "../config/cloudinary";
import fs, { promises } from "fs-extra";
import Pets from "../models/Pets";
import PetsImg from "../models/PetsImg";

export class petsImgControllers {
    static createImg = async (req: Request, res: Response) => {
        try {
            const imagenes = req.files?.imagenes;

            let tempFilePaths = Array.isArray(imagenes)
                ? imagenes.map(img => img.tempFilePath)
                : imagenes ? [imagenes.tempFilePath] : [];

            for (const i of tempFilePaths) {
                if (imagenes) {
                    const newImgnPet = new PetImgs();

                    //almacenamos el id de la mascota en sus imagenes correspondientes
                    newImgnPet.petId = req.pet.id

                    //almacenamos los ids de las imagenes en la mascotas 
                    req.pet.imagenes = [...req.pet.imagenes, newImgnPet.id]

                    //esta es la función sube las imagenes al couldinary
                    const aux = await upldImg(i);
                    //Almacenamos los datos que requerimos en la BD
                    newImgnPet.public_id = aux.public_id
                    newImgnPet.secure_url = aux.secure_url

                    //Eliminamos las imagenes que estan de forma local
                    //Guardamos en la BD los datos de la imagen
                    //Guardamos el ID de las imagenes de la mascota
                    await Promise.allSettled([fs.unlink(i), newImgnPet.save(), req.pet.save()])
                }
            }

            res.status(201).send('Imagenes Alamacenadas')

        } catch (error) {
            res.status(500).send(error.message)
            return
        }
    }

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