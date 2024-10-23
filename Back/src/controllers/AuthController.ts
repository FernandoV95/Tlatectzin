import type { Request, Response } from "express";
import User from "../models/Users";
import Veterinarios from "../models/Veterinary";
import { desEncrypPass, hashPass } from "../util/Hash";
import Token from "../models/Token";
import { generateToken } from "../util/GeneraToken";
import { AuthEmail } from "../email/AuthUser";

export class Accounts {
    //Iniciamos sesion
    static login = async (req: Request, res: Response) => {
        try {
            const { email, pass } = req.body

            const [exstUser, exstVet] = await Promise.all([
                User.findOne({ email }),
                Veterinarios.findOne({ email }),
            ]);

            const cuenta = exstUser || exstVet

            //Busca al usuario
            if (!cuenta) {
                const error = new Error('¡Cuenta no registrada!')
                return res.status(401).json({ error: error.message })
            }

            //Verifica si esta autenticado
            if (!cuenta.confirmed) {
                const error = new Error('¡Cuenta no autenticada!')
                return res.status(401).json({ error: error.message })
            }

            //Verifica la contraseña 
            const pssCorrect = await desEncrypPass(pass, cuenta.pass);
            if (!pssCorrect) {
                const error = new Error('Contraseña Incorrecta')
                return res.status(401).json({ error: error.message })
            }

            res.send(`Bienvenid@ ${cuenta ? (exstUser ? cuenta.nombres : `Dr(a). ${cuenta.nombres}`) : ''}`);

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Validamos la cuenta con el token
    static validateAccountToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Token no valido!');
                return res.status(401).json({ error: error.message });
            }

            const [user, vet] = await Promise.all([
                User.findById(srchTkn.user),
                Veterinarios.findById(srchTkn.user),
            ]);

            const cuenta = user || vet

            cuenta.confirmed = true

            await Promise.allSettled([srchTkn.deleteOne(), cuenta.save()])

            res.send('Cuenta Autenticada');

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Envia el token para actualizar la contraseña
    static forgotPass = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const [exstUser, exstVet] = await Promise.all([
                User.findOne({ email }),
                Veterinarios.findOne({ email }),
            ]);

            const cuenta = exstUser || exstVet

            if (!cuenta) {
                const error = new Error('No existe el correo');
                return res.status(401).json({ error: error.message });
            }

            //General el token
            const token = new Token;
            token.token = generateToken()
            token.user = cuenta.id

            //Enviar Email
            const emailMethod = exstUser ? 'updatePass' : 'updatePassVet';
            AuthEmail[emailMethod]({
                email: cuenta.email,
                name: cuenta.nombres,
                apPat: cuenta.apPat,
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

    //Reestablecer contraseña mediante el token
    static resetPass = async (req: Request, res: Response) => {
        try {
            const { pass } = req.body
            const { token } = req.params
            const srchTkn = await Token.findOne({ token })

            if (!srchTkn) {
                const error = new Error('¡Token no valido!');
                return res.status(401).json({ error: error.message });
            }

            const [exstUser, exstVet] = await Promise.all([
                User.findById(srchTkn.user),
                Veterinarios.findById(srchTkn.user),
            ]);

            const accnt = exstUser || exstVet;

            //Hasear la contraseña
            accnt.pass = await hashPass(pass)

            await Promise.allSettled([accnt.save(), srchTkn.deleteOne()])
            res.send('Contraseña actualizada')

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Solicita un nuevo token para validar la cuenta
    static requestToken = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const [exstUser, exstVet] = await Promise.all([
                User.findOne({ email }),
                Veterinarios.findOne({ email }),
            ]);

            const accnt = exstUser || exstVet

            //Buscar la cuenta

            if (!accnt) {
                const error = new Error('Cuenta No registrada!')
                return res.status(401).json({ error: error.message })
            }

            //Verificar si esta autenticado
            if (accnt.confirmed) {
                const error = new Error('¡Cuenta Ya Autenticada!')
                return res.status(401).json({ error: error.message })
            }

            //General el token
            const tkn = new Token;
            tkn.token = generateToken()
            tkn.user = accnt.id

            //Enviar Email
            const emailMethod = exstUser ? 'reqTokenUser' : 'reqTokenVet';

            AuthEmail[emailMethod]({
                email: accnt.email,
                name: accnt.nombres,
                apPat: accnt.apPat,
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