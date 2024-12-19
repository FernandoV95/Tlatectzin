import type { Request, Response } from "express";
import User from "../models/Users";
import { AuthEmail } from "../email/AuthUser";


export class Admind {


    //Mandar correo para que los futuros veterinarios se registren
    static sendEmailVeter = async (req: Request, res: Response) => {
        try {

            const { email } = req.body
            // Prevenir duplicados
            const usr = await User.findOne({ email })

            if (usr) {
                res.status(409).json({ error: '¡Correo ya registrado. Asigna un nuevo rol!' });
                return
            }

            //Enviar Email
            AuthEmail.RegisterVeter({
                email: email
            })

            res.status(201).send('Correo enviado con exito')

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    
    //Cambiar datos de cualquier usuario
    static ChngData = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const user = await User.findById(id);

            if (!user) {
                res.status(404).json({ error: '¡Usuario no encontrado!' });
                return;
            }
            await User.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send('Datos Actualizados')
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Ver a todos los usuarios
    static getUsers = async (req: Request, res: Response) => {
        try {
            const usrs = await User.find({})
            if (!usrs) {
                res.status(404).json({ error: '¡No hay usuarios registrados!' });
                return;
            }
            res.status(200).json(usrs)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Traer al usuario por ID
    static getUsersId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const usrs = await User.findById(id)
            if (!usrs) {
                res.status(404).json({ error: '¡Usuario no localizado!' });
                return;
            }
            res.status(200).json(usrs)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Registrar a las mascotas

    //Cambiar datos de las mascotas



}

