import type { Request, Response } from "express";
import User from "../models/Users";
import { desEncrypPass, hashPass } from "../util/Hash";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import { generateJWT } from "../util/JWT";

export class UserController {

    //Crear usuarios
    static newUser = async (req: Request, res: Response) => {
        try {
            const { pass, email } = req.body

            // Prevenir duplicados
            const usr = await User.findOne({ email })

            if (usr) {
                res.status(409).json({ error: '¡Este correo ya esta registrado!' });
                return
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
            if (!TknScc || !NuScc) {
                res.status(500).json({ error: 'Datos no almacenados' });
                return;
            }

            //Enviar Email
            AuthEmail.sendConfirAccnt({
                email: newUser.email,
                name: newUser.nombres,
                token: tkn.token
            })


            res.status(201).send('Hemos enviado tu codigo a tu correo')

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Crear nuevo veterinario
    static newVeter = async (req: Request, res: Response) => {
        try {
            const { pass } = req.body

            const newUser = new User(req.body)

            //Asignar el rol de veterinario
            newUser.rol = "veterinario"

            //Hasear la contraseña
            newUser.pass = await hashPass(pass)

            //General el token
            const tkn = new Token;
            tkn.token = generateToken()
            tkn.user = newUser.id


            // Guardar usuario y token
            const [TknScc, NuScc] = await Promise.allSettled([tkn.save(), newUser.save()]);

            // Comprobar resultados
            if (!TknScc || !NuScc) {
                res.status(500).json({ error: 'Datos no almacenados' });
                return;
            }

            //Enviar Email
            AuthEmail.confirmAccntVeter({
                email: newUser.email,
                name: newUser.nombres,
                token: tkn.token
            })


            res.send('Hemos enviado tu codigo a tu correo')

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Cambiar contraseña mediante el codigo
    static updatePass = async (req: Request, res: Response) => {
        try {
            const { pass } = req.body
            const { token } = req.params
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Codigo no valido!');
                res.status(401).json({ error: error.message });
                return
            }

            const usr = await User.findById(srchTkn.user)

            //Hasear la contraseña
            usr.pass = await hashPass(pass)

            await Promise.allSettled([usr.save(), srchTkn.deleteOne()])
            res.status(201).send('Contraseña actualizada')

        } catch (error) {
            res.status(404).json({ error: error.message })
            return
        }
    }

}