import type { Request, Response } from "express";
import User from "../models/Users";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import { hashPass } from "../util/Hash";
import Veterinarios from "../models/Veterinary";

export class UserController {
    //Crear usuarios
    static newUser = async (req: Request, res: Response) => {
        try {
            const { pass, email } = req.body

            // Prevenir duplicados
            const [extUser, extVet] = await Promise.all([
                User.findOne({ email }),
                Veterinarios.findOne({ email }),
            ]);

            const cuenta = extUser || extVet;
            if (cuenta) {
                return res.status(409).json({ error: '¡Este correo ya esta registrado!' });
            }

            const newUser = new User(req.body)

            //Hasear la contraseña
            newUser.pass = await hashPass(pass)

            //General el token
            const tkn = new Token;
            tkn.token = generateToken()
            tkn.user = newUser.id


            // Guardar usuario y token
            const [TknScc, NuScc] = await Promise.allSettled([tkn.save(), newUser.save()]);

            // Comprobar resultados
            if (NuScc.status === 'rejected') {
                return res.status(500).json({ error: 'Error al guardar el usuario: ' + NuScc.reason });
            }

            if (TknScc.status === 'rejected') {
                return res.status(500).json({ error: 'Error al generar el token: ' + TknScc.reason });
            }

            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email: newUser.email,
                name: newUser.nombres,
                token: tkn.token
            })

            res.status(201).json({ message: 'Revisa tu correo para confirmar tu registro' });

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }


}