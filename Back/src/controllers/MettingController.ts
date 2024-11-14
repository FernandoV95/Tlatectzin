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
                return res.status(400).json({ error: error.message })
            }

            return res.status(201).send('Cita Agendada');

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    //Ver todas las citas 
    static getAllMetting = async (req: Request, res: Response) => {
        try {
            const allMtng = await Meeting.find({})
            return res.status(200).json(allMtng)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }


    //Ver todas las citas creadas por el usuario
    static getMetting = async (req: Request, res: Response) => {
        try {
            const allMtng = await Meeting.find({
                $or: [
                    { usuario: { $in: req.user } }
                ]
            })
            return res.status(200).json(allMtng);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Ver una cita en especifico[OK]
    static getByMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('Cita no encontrado')
                return res.status(404).json({ error: error.message })
            }

            return res.status(200).json(MtngID)

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    //Actualiza los datos de su cita[Ok]
    static updateMttng = async (req: Request, res: Response) => {
        try { 
            const { idM } = req.params

            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('¡Cita no encontrado!')
                return res.status(404).json({ error: error.message })
            }

            // Actualizamos la cita
            const updt = await Meeting.findByIdAndUpdate(idM, req.body, { new: true });

            if(!updt){
                const error = new Error('¡Datos no actualizados!')
                return res.status(400).json({ error: error.message })
            }
            return res.status(200).send('¡Datos actualizados!');

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }


    //Cancelar su cita
    static cancelledMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const mtng = await Meeting.findById(idM)
            if (!mtng) {
                const error = new Error('¡Cita no encontrada!')
                return res.status(404).json({ error: error.message })
            }
            await mtng.deleteOne()
            return res.status(200).send('¡Cita cancelada!');
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }



}