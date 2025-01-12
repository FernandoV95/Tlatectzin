import type { Request, Response } from "express";
import User from "../models/Users";
import { hashPass } from "../util/Hash";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser"; 

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


            // Guardar usuario y codigo 
            const [usrRstl, tknRslt] = await Promise.all([
                newUser.save().catch(err => err),
                tkn.save().catch(err => err)
            ]);

            // Verificar si ambas operaciones fueron exitosas
            if (usrRstl instanceof Error || tknRslt instanceof Error) {
                const errorMessages = [];
                if (usrRstl instanceof Error) errorMessages.push('Error al guardar los datos del usuario');
                if (tknRslt instanceof Error) errorMessages.push('Error al generar el codigo');
                return res.status(500).json({ error: errorMessages.join(', ') });
            }

            // Enviar el correo de confirmación solo si ambas operaciones fueron exitosas
            try {
                await AuthEmail.sendConfirAccnt({
                    email: newUser.email,
                    name: newUser.nombres,
                    token: tkn.token
                });
            } catch (emailError) {
                console.error('Error al enviar el correo:', emailError);
                return res.status(500).json({ error: 'Hubo un error al enviar el correo de confirmación.' });
            }


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
            const [TknScc, NuScc] = await Promise.allSettled([
                newUser.save().catch(err => err),
                tkn.save().catch(err => err)
            ]);

            if (NuScc instanceof Error || TknScc instanceof Error) {
                const errorMessages = [];
                if (NuScc instanceof Error) errorMessages.push('Error al guardar los datos del usuario');
                if (TknScc instanceof Error) errorMessages.push('Error al generar el codigo');
                return res.status(500).json({ error: errorMessages.join(', ') });
            }

            // Enviar el correo de confirmación solo si ambas operaciones fueron exitosas
            try {
                //Enviar Email
                AuthEmail.confirmAccntVeter({
                    email: newUser.email,
                    name: newUser.nombres,
                    token: tkn.token
                })


            } catch (emailError) {
                console.error('Error al enviar el correo:', emailError);
                return res.status(500).json({ error: 'Hubo un error al enviar el correo de confirmación.' });
            }

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