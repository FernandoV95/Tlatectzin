import type { Request, Response } from "express";
import User from "../models/Users";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";
import { desEncrypPass, hashPass } from "../util/Hash";

export class UserController {
    //Crear usuarios
    static newUser = async (req: Request, res: Response) => {
        try {
            const { pass, email } = req.body

            const newUser = new User(req.body)

            // Prevenir duplicados
            const userExists = await User.findOne({ email })
            if (userExists) {
                const error = new Error('El Usuario ya esta registrado')
                return res.status(409).json({ error: error.message })
            }

            //Hasear la contraseña
            newUser.pass = await hashPass(pass)

            //General el token
            const token = new Token;
            token.token = generateToken()
            token.user = newUser.id

            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email: newUser.email,
                name: newUser.nombres,
                token: token.token
            })

            await Promise.allSettled([token.save(), newUser.save()])

            res.send('Revisa tu correo para autenticar tu cuenta')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Validar mi cuenta 
    static validateAccountToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const searchToken = await Token.findOne({ token })
            if (!searchToken) {
                const error = new Error('¡Token no valido!');
                return res.status(401).json({ error: error.message });
            }

            const user = await User.findById(searchToken.user)
            user.confirm = true

            await Promise.allSettled([searchToken.deleteOne(), user.save()])

            res.send('Cuenta Autenticada');

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Olvide mi contraseña
    static forgotPass = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const searchUser = await User.findOne({ email })

            if (!searchUser) {
                const error = new Error('No existe el correo');
                return res.status(401).json({ error: error.message });
            }

            //General el token
            const token = new Token;
            token.token = generateToken()
            token.user = searchUser.id

            //Enviar Email
            AuthEmail.updatePass({
                email: searchUser.email,
                name: searchUser.nombres,
                token: token.token
            })

            //Guardamos el token
            await token.save()

            res.send('Revisa tu Email')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Validar el token para cambiar contraseña
    static validateResetToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('Token NO valido');
                return res.status(401).json({ error: error.message });
            }

            res.send('Ingresa tu nueva contraseña')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Reestablecer contraseña
    static resetPass = async (req: Request, res: Response) => {
        try {
            const { pass } = req.body
            const { token } = req.params
            const srchUserByTkn = await Token.findOne({ token })

            if (!srchUserByTkn) {
                const error = new Error('Token No encontrado');
                return res.status(401).json({ error: error.message });
            }
            const user = await User.findById(srchUserByTkn.user)

            //Hasear la contraseña
            user.pass = await hashPass(pass)

            await Promise.allSettled([user.save(), srchUserByTkn.deleteOne()])
            res.send('Contraseña actualizada')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Iniciar sesion
    static login = async (req: Request, res: Response) => {
        try {
            const { email, pass } = req.body
            const srchUsr = await User.findOne({ email })
            //Busca al usuario
            if (!srchUsr) {
                const error = new Error('¡Usuario no registrado!')
                return res.status(401).json({ error: error.message })
            }
            //Verifica si esta autenticado
            if (!srchUsr.confirm) {
                const error = new Error('¡Cuenta no autenticada!')
                return res.status(401).json({ error: error.message })
            }
            // Revisar password
            const pssCorrect = await desEncrypPass(pass, srchUsr.pass)
            if (!pssCorrect) {
                const error = new Error('Contraseña Incorrecta')
                return res.status(401).json({ error: error.message })
            }
            res.send(`Bienvenido ${srchUsr.nombres}`)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Solicitar un nuevo token para vilidar tu cuenta
    static requestToken = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ email })

            //Buscar al usuario
            if (!user) {
                const error = new Error('¡Usuario no registrado!')
                return res.status(401).json({ error: error.message })
            }

            //Verificar si esta autenticado
            if (user.confirm) {
                const error = new Error('¡Usuario Ya Autenticado!')
                return res.status(401).json({ error: error.message })
            }

            //General el token
            const token = new Token;
            token.token = generateToken()
            token.user = user.id

            //Enviar Email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.nombres,
                token: token.token
            })
            
            //Guardar el token
            await token.save()

            res.send('Revisa tu correo para autenticar tu cuenta')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
}