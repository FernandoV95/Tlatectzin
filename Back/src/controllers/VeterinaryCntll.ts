import { Request, Response } from "express";
import Veterinarios from "../models/Veterinary";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";

export class veterinaryControllers {
    static createVeterinary = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const newVeterinary = new Veterinarios(req.body)

            // Prevenir duplicados
            const vetExists = await Veterinarios.findOne({ email })
            if (vetExists) {
                const error = new Error('El veterinario ya esta registrado')
                return res.status(409).json({ error: error.message })
            }

            //General el token
            const token = new Token;
            token.token = generateToken()
            token.user = newVeterinary.id

            //Enviar Email
            AuthEmail.confimVeterinary({
                email: newVeterinary.email,
                name: newVeterinary.nombres,
                apPat: newVeterinary.apPat,
                token: token.token
            })

            await Promise.allSettled([token.save(), newVeterinary.save()])
            res.send('Nuevo Veterinario registrado')
        } catch (error) {
            return res.status(404).json({ error: error })
        }
    }
}