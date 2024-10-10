import { Request, Response } from "express";
import Veterinarios from "../models/Veterinary";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import User from "../models/Users";

export class veterinaryControllers {
    static createVeterinary = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            // Prevenir duplicados
            const [extUser, extVet] = await Promise.all([
                User.findOne({ email }),
                Veterinarios.findOne({ email }),
            ]);
            const cuenta = extUser || extVet;
            if (cuenta) {
                return res.status(409).json({ error: '¡Este correo ya está registrado!' });
            }

            const newVety = new Veterinarios(req.body);

            // Generar el token
            const tkn = new Token();
            tkn.token = generateToken();
            tkn.user = newVety.id;

            // Guardar usuario y token
            const [TknScc, NvScc] = await Promise.allSettled([tkn.save(), newVety.save()]);

            // Comprobar resultados
            if (NvScc.status === 'rejected') {
                console.error('Error al guardar veterinario:', NvScc.reason);
                return res.status(500).json({ error: '¡Error al registrarte!', details: NvScc.reason });
            }

            if (TknScc.status === 'rejected') {
                return res.status(500).json({ error: '¡Error al generar token!' });
            }

            // Enviar Email
            await AuthEmail.confimVeterinary({
                email: newVety.email,
                name: newVety.nombres,
                apPat: newVety.apPat,
                token: tkn.token
            });

            res.status(201).json({ message: '¡Datos del veterinario almacenados!' });
        } catch (error) {
            return res.status(404).json({ error: error })
        }
    }

    static deleteVeterinary = async (req: Request, res: Response) => {
        try {
            const { idV } = req.params
            const vety = await Veterinarios.findById(idV)
            if (!vety) {
                const error = new Error('¡Veterinario no encontrado!')
                return res.status(404).json({ error: error.message })
            }
            await vety.deleteOne()
            res.send('¡Veterinario Eliminado!')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

}