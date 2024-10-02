import { Request,Response,NextFunction } from "express"
import Pets, { IPets } from "../models/Pets"

declare global {
    namespace Express {
        interface Request {
            pet:IPets
        }
    }
}
export async function validatePet( req: Request, res: Response, next: NextFunction ) {
    //Este middleware busca a los datos de las mascotas 
    const { idPet } = req.params
    const pet = await Pets.findById( idPet )
    if (!pet) {
        const error = new Error('Mascota no registrada')
        return res.status(400).json({ error: error.message })
    }
    req.pet = pet
    next()
};

export default validatePet
