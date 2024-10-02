import type { Request, Response } from "express";
import Pets from "../models/Pets";
import PetImgs from "../models/PetsImg";
import { dltImg } from "../config/cloudinary";



export class petsControllers {
    static createPet = async (req: Request, res: Response) => {
        try {
            const newPet = new Pets(req.body)
            await newPet.save()
            res.status(201).send('Datos Almacenados')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    static getAllPets = async (req: Request, res: Response) => {
        try {
            const allPets = await Pets.find()
            if (!allPets) {
                const error = new Error('No hay mascotas :( ')
                return res.status(404).json({ error: error.message })
            }
            res.json(allPets)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    static getPetsById = async (req: Request, res: Response) => {
        try {
            const { idPet } = req.params
            const Pet = await Pets.findById(idPet)
            if (!Pet) {
                const error = new Error('Mascota no registrada :( ')
                return res.status(404).json({ error: error.message })
            }
            res.json(Pet)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    static updatePet = async (req: Request, res: Response) => {
        try {
            const { idPet } = req.params
            const Pet = await Pets.findById(idPet)
            if (!Pet) {
                const error = new Error('Mascota no registrada :( ')
                return res.status(404).json({ error: error.message })
            }
            await Pets.findByIdAndUpdate (idPet, req.body, { new: true })
            res.send('Datos Actualizados')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

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
            res.send('Mascota Eliminada')
 

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

}