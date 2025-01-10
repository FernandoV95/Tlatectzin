import type { Request, Response } from "express";
import User from "../models/Users";
import { AuthEmail } from "../email/AuthUser";
import Meeting from "../models/Meeting";


export class Admind {

    //----------------> Usuarios <----------------
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

    //-----------------> Citas <----------------
    //Ver todas las citas
    static getAllMeeting = async (req: Request, res: Response) => {
        try {
            const mtng = await Meeting.find({})
                .populate('usuario', 'nombres')
                .populate('veterinario', 'nombres')
            if (!mtng) {
                const error = new Error('¡No hay citas agendadas!');
                res.status(401).json({ error: error.message });
                return
            }
            res.status(200).json(mtng)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Ver una cita por Id
    static getByMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('Cita no encontrado')
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).json(MtngID)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //traemos a todos los veterinarios  --- Borrar
    static getAllVet = async (req: Request, res: Response) => {
        try {
            const veter = await User.find({ 'rol': 'veterinario' }).select('nombres').populate('nombres');
            if (!veter) {
                const error = new Error('No hay veterinarios registrados')
                res.status(404).json({ error: error.message })
                return
            }
            res.status(200).send(veter)
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Traemos los datos  de la cita
    static editMtng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            //Buscamos la cita
            const MtngID = await Meeting.findById(idM)

            if (!MtngID) {
                const error = new Error('Cita no encontrado')
                res.status(404).json({ error: error.message })
                return
            }

            //Guardamos cambios
            MtngID.save()

            res.status(200).send('Veterinario Asignado')
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }


    //Buscamos citas con fecha y hora similares pero con veterinarios disponibles
    static vetersAvailable = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const MtngID = await Meeting.findById(idM)

            //Buscamos la cita
            if (!MtngID) {
                const error = new Error('¡Cita no encontrado!')
                res.status(404).json({ error: error.message })
                return
            }

            //Sacamos los datos que necesitamos para hacer otra consulta
            const { fecha, hora } = MtngID

            //Buscamos las citas que tengan la misma fecha y hora
            const equalsMtgn = await Meeting.find({ fecha, hora, _id: { $ne: idM } })

            //Traemos a los veterinarios disponibles
            const ocupados = equalsMtgn.map(meeting => meeting.veterinario)
            const disponibles = await User.find({
                _id: { $nin: ocupados },
                rol: 'veterinario'
            }).select('nombres');  // Selecciona solo los campos que quieres mostrar


            // Respondemos con los veterinarios disponibles
            res.status(200).json({
                veterAvlbl: disponibles,
                fecha,
                hora
            })
 
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    static assignVeter = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const cita = await Meeting.findById(idM)

            if (!cita) {
                res.status(404).json({ error: '¡Cita no encontrada!' });
                return;
            }
            await Meeting.findByIdAndUpdate(idM, req.body, { new: true });

            res.status(200).send('¡Veterinario Asignado 😊!');
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }


}

