import type { Request, Response } from "express";
import User from "../models/Users";
import { desEncrypPass, hashPass } from "../util/Hash";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import { generateJWT } from "../util/JWT";

export class Accounts {

    //Crear usuarios
    static newUser = async (req: Request, res: Response) => {
        try {
            const { pass, email } = req.body

            // Prevenir duplicados
            const usr = await User.findOne({ email })

            if (usr) {
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


            res.send('Hemos enviado tu codigo a tu correo')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Validamos la cuenta con el codigo
    static validateAccountToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Token no valido!');
                return res.status(401).json({ error: error.message });
            }

            const usr = await User.findById(srchTkn.user)

            usr.confirmed = true

            await Promise.allSettled([srchTkn.deleteOne(), usr.save()])

            res.send('Ya puedes iniciar sesión');

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Iniciamos sesion
    static login = async (req: Request, res: Response) => {
        try {
            const { email, pass } = req.body

            const usr = await User.findOne({ email })

            //Busca al usuario
            if (!usr) {
                const error = new Error('¡Cuenta no registrada!')
                return res.status(401).json({ error: error.message })
            }

            //Verifica si esta autenticado
            if (!usr.confirmed) {
                const error = new Error('¡Cuenta no autenticada!')
                return res.status(401).json({ error: error.message })
            }

            //Verifica la contraseña 
            const pssCorrect = await desEncrypPass(pass, usr.pass);
            if (!pssCorrect) {
                const error = new Error('Contraseña Incorrecta')
                return res.status(401).json({ error: error.message })
            }

            const auth = generateJWT({ id: usr.id })
            res.send(auth);


        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Envia el codigo para actualizar la contraseña
    static forgotPass = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const usr = await User.findOne({ email })

            if (!usr) {
                const error = new Error('¡Correo no registrado!');
                return res.status(401).json({ error: error.message });
            }

            //General el token
            const tkn = new Token;
            tkn.token = generateToken()
            tkn.user = usr.id

            //Enviar Email
            AuthEmail.forgotPss({
                email: usr.email,
                name: usr.nombres,
                token: tkn.token
            })


            //Guardamos el token
            await tkn.save()

            res.send('Revisa tu Email')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Validar el codigo para cambiar contraseña
    static validateResetToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('Codigo NO valido');
                return res.status(401).json({ error: error.message });
            }

            res.send('Ingresa tu nueva contraseña')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Cambiar contraseña mediante el codigo
    static updatePass = async (req: Request, res: Response) => {
        try {
            const { pass } = req.body
            const { token } = req.params
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Token no valido!');
                return res.status(401).json({ error: error.message });
            }

            const usr = await User.findById(srchTkn.user)

            //Hasear la contraseña
            usr.pass = await hashPass(pass)

            await Promise.allSettled([usr.save(), srchTkn.deleteOne()])
            res.send('Contraseña actualizada')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Solicita un nuevo token para validar la cuenta
    static requestToken = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const usr = await User.findOne({ email })

            //Buscar la cuenta

            if (!usr) {
                const error = new Error('Cuenta No registrada!')
                return res.status(401).json({ error: error.message })
            }

            //Verificar si esta autenticado
            if (usr.confirmed) {
                const error = new Error('¡Cuenta Ya Autenticada!')
                return res.status(401).json({ error: error.message })
            }

            //General el token
            const tkn = new Token;
            tkn.token = generateToken()
            tkn.user = usr.id

            //Enviar Email
            AuthEmail.reqCodUser({
                email: usr.email,
                name: usr.nombres,
                token: tkn.token
            })


            //Guardar el token
            await tkn.save()

            res.send('Revisa tu correo para autenticar tu cuenta')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }


}