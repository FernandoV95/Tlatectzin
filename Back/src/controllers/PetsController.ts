import type { Request, Response } from "express";
import Pets from "../models/Pets";
import PetImgs from "../models/PetsImg";
import { dltImg } from "../config/cloudinary";


export class petsControllers {

    //Almacenar datos de la mascota
    static createPet = async (req: Request, res: Response) => {
        try {
            const newPet = new Pets(req.body)
            await newPet.save()
            //res.status(201).send('Mascota agregada 😊')
            res.status(201).send(`${newPet._id}`)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Ver todos los datos de todas las mascotas
    static getAllPets = async (req: Request, res: Response) => {
        try {
            const allPets = await Pets.find().populate('imagenes')

            if (!allPets) {
                const error = new Error('No hay mascotas 😞 ')
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(allPets)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Ver todos los datos de todas las mascotas que estan disponibles
    static catalogo = async (req: Request, res: Response) => {
        try {
            const allPets = await Pets.find({ status: 'pendiente' }).populate('imagenes')

            if (!allPets) {
                const error = new Error('No hay mascotas 😞 ')
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(allPets)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Ver los datos de la mascota por ID
    static getPetsById = async (req: Request, res: Response) => {
        try {
            const { idPet } = req.params
            const Pet = await Pets.findById(idPet).populate('imagenes')
            if (!Pet) {
                const error = new Error('Mascota no registrada :( ')
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(Pet)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Actualizar datos la mascota
    static updatePet = async (req: Request, res: Response) => {
        try {
            const { idPet } = req.params
            const Pet = await Pets.findById(idPet)
            if (!Pet) {
                const error = new Error('Mascota no registrada 😞 ')
                return res.status(404).json({ error: error.message })
            }
            await Pets.findByIdAndUpdate(idPet, req.body, { new: true })
            res.status(200).send('Datos Actualizados')

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Actualizar datos la mascota
    static deletePet = async (req: Request, res: Response) => {
        try {
            for (const i of req.pet.imagenes) {
                //Buscamos esos ID en PetsImg  
                //Borramos las imagenes de couldinary
                //Eliminamos las imagenes
                const ImgPtId = await PetImgs.findById(i.toString())
                dltImg(ImgPtId.public_id)
                await ImgPtId.deleteOne()
            }

            //Borramos los datos de la mascota
            await Pets.deleteOne()
            res.status(200).send('Mascota borrada')

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

}