import type { Request, Response } from "express";
import User from "../models/Users";
import { desEncrypPass, hashPass } from "../util/Hash";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import { generateJWT } from "../util/JWT";

export class AuthController {

    //Iniciamos sesion
    static login = async (req: Request, res: Response) => {
        try {
            const { email, pass } = req.body

            const usr = await User.findOne({ email })

            //Busca al usuario
            if (!usr) {
                const error = new Error('¡Cuenta no registrada!')
                res.status(401).json({ error: error.message })
                return
            }

            //Verifica si esta autenticado
            if (!usr.confirmed) {
                const error = new Error('¡Cuenta no autenticada!')
                res.status(401).json({ error: error.message })
                return
            }

            //Verifica la contraseña 
            const pssCorrect = await desEncrypPass(pass, usr.pass);
            if (!pssCorrect) {
                const error = new Error('Contraseña Incorrecta')
                res.status(401).json({ error: error.message })
                return
            }

            //const auth = generateJWT({ id: usr.id })
            res.status(200).send('Bienvenido');

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Validamos la cuenta con el codigo
    static validateAccountCod = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Codigo no valido!');
                res.status(401).json({ error: error.message });
                return
            }

            const usr = await User.findById(srchTkn.user)

            usr.confirmed = true

            await Promise.allSettled([srchTkn.deleteOne(), usr.save()])

            res.send('Ya puedes iniciar sesión');

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Envia el codigo para actualizar la contraseña
    static SendCodChngPass = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const usr = await User.findOne({ email })

            if (!usr) {
                const error = new Error('¡Correo no registrado!');
                res.status(401).json({ error: error.message });
                return
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

            res.status(201).send('Revisa tu Email')
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Validar el codigo para cambiar contraseña
    static validateCodChngPass = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('Codigo NO valido');
                return res.status(401).json({ error: error.message });
            }

            res.send('Ingresa tu nueva contraseña')
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Solicita un nuevo token para validar la cuenta
    static requestCod = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const usr = await User.findOne({ email })

            //Buscar la cuenta

            if (!usr) {
                const error = new Error('Cuenta No registrada!')
                res.status(401).json({ error: error.message })
                return
            }

            //Verificar si esta autenticado
            if (usr.confirmed) {
                const error = new Error('¡Cuenta Ya Autenticada!')
                res.status(401).json({ error: error.message })
                return
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

            res.status(201).send('Revisa tu correo para autenticar tu cuenta')

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }



}