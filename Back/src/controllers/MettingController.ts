import type { Request, Response } from "express";
import Meeting from "../models/Meeting";
import { final, inicio } from "../util/FinalEnd";
import SendmailTransport from "nodemailer/lib/sendmail-transport";



export class meetingControllers {

    //Crear una cita
    static newMeeting = async (req: Request, res: Response) => {
        try {

            const { fecha, hora } = req.body;
            let ncita = 1;

            //Traemos el ultimo registro
            const meetings = await Meeting.find();
            if (meetings.length !== 0) {
                const aux = await Meeting.find().sort({ N_cita: -1 })
                ncita = aux[0].N_cita + 1;
            }
            //Asignamos los datos a la BD
            const nuevaCita = new Meeting(req.body)
            nuevaCita.N_cita = ncita
            nuevaCita.start = inicio({ fecha, hora });
            nuevaCita.end = final({ fecha, hora });

            const exito = await nuevaCita.save();

            if (!exito) {
                const error = new Error('¡Cita no agendada!')
                res.status(400).json({ error: error.message })
                return
            }

            res.status(201).send('Cita Agendada');

        } catch (error) {
            res.status(500).json({ error: error.message });
            return
        }
    }

    //Ver todas las citas 
    static getAllMetting = async (req: Request, res: Response) => {
        try {
            const mtng = await Meeting.find({})
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

    //Actualiza los datos de la cita
    static updateMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params

            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('¡Cita no encontrado!')
                res.status(404).json({ error: error.message })
                return
            }

            // Actualizamos la cita
            const updt = await Meeting.findByIdAndUpdate(idM, req.body, { new: true });

            if (!updt) {
                const error = new Error('¡Datos no actualizados!')
                res.status(400).json({ error: error.message })
                return
            }
            res.status(200).send('¡Cita modificada 😊!');

        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

    //Cancelar su cita
    static cancelledMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const mtng = await Meeting.findById(idM)

            //Buscamos la cita
            if (!mtng) {
                const error = new Error('¡Cita no encontrada!')
                res.status(404).json({ error: error.message })
                return
            }

            //Verificamos si la cita ya esta cancelada
            if (mtng.status === "Cancelada") {
                const error = new Error('¡Ya cancelaste esta cita 😡!')
                res.status(404).json({ error: error.message })
                return
            }

            //Cancelar la cita
            mtng.status = "Cancelada"

            //Guardar Cambios
            await mtng.save()

            res.status(200).send('¡Cita cancelada 😔!');
        } catch (error) {
            res.status(500).json({ error: error.message })
            return
        }
    }

}