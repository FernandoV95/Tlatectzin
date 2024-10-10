import type { Request, Response } from "express";
import Meeting from "../models/Meeting";
import { final, inicio } from "../util/FinalEnd";
import SendmailTransport from "nodemailer/lib/sendmail-transport";



export class meetingControllers {

    //Crear una cita
    static newMeeting = async (req: Request, res: Response) => {
        try {
            const { fecha, hora, motivo } = req.body;

            const motivoLc = motivo.toLowerCase();

            //Verificamos si el horario esta en el rango
            const [auxH, auxM] = hora.split(':').map(Number);
            if (auxH < 9 || auxH > 15 || auxM !== 0) {
                const error = new Error('Horario NO valido')
                return res.status(404).json({ error: error.message })
            }

            //verificamos si la fecha no ha pasado o es hoy 
            const [año, mes, dia] = fecha.split("-").map(Number);
            const hoy = new Date();
            const aux = new Date(año, mes - 1, dia);

            if (aux.getTime() <= hoy.getTime()) {
                const error = new Error('¡Fecha invalida!')
                return res.status(404).json({ error: error.message })
            }

            // Verificamos si hay traslape
            const translape = await Meeting.find({ fecha, hora, motivo: motivoLc });
            if (translape.length > 0) {
                return res.status(400).json({ error: '¡Horario no disponible!' });
            }

            // Creamos la cita
            const nwMtng = new Meeting({ ...req.body, motivo:motivoLc });
            nwMtng.start = inicio({ fecha, hora });
            nwMtng.end = final({ fecha, hora });

            await nwMtng.save();
            return res.status(201).send('Cita Agendada UwU');


        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    //Ver todas las citas
    static getMetting = async (req: Request, res: Response) => {
        try {
            const allMtng = await Meeting.find({})
            res.json(allMtng)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //Ver una cita en especifico
    static getByMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('Cita no encontrado')
                return res.status(404).json({ error: error.message })
            }
            res.json(MtngID)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    //ACtualizar su hora o fecha
    static updateMttng = async (req: Request, res: Response) => {
        try {
            const { fecha, hora, motivo } = req.body;
            const { idM } = req.params
            const motivoLc = motivo.toLowerCase();

            const MtngID = await Meeting.findById(idM)
            if (!MtngID) {
                const error = new Error('¡Cita no encontrado!')
                return res.status(404).json({ error: error.message })
            }

            //Verificamos la fecha
            const [año, mes, dia] = fecha.split("-").map(Number);
            const hoy = new Date();
            const aux = new Date(año, mes - 1, dia);

            if (aux.getTime() <= hoy.getTime()) {
                const error = new Error('¡Fecha Invalida!')
                return res.status(404).json({ error: error.message })
            }

            //Verificamos si el horario esta en el rango
            const [auxH, auxM] = hora.split(':').map(Number);
            if (auxH < 9 || auxH > 15 || auxM !== 0) {
                const error = new Error('¡Horario NO valido!')
                return res.status(404).json({ error: error.message })
            }

            // Verificamos si hay traslape
            const translape = await Meeting.find({ fecha, hora,  motivo: motivoLc });
            if (translape.length > 0) {
                return res.status(400).json({ error: '¡Horario no disponible!' });
            }

            // Actualizamos la cita
            const updateData = {
                ...req.body,
                motivo: motivoLc  // Reemplaza motivo con el valor en minúsculas
            };
            
            // Actualiza el documento
            await Meeting.findByIdAndUpdate(MtngID, updateData, { new: true });

            return res.status(201).send('Cita Modificada UwU');


        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    static cancelledMttng = async (req: Request, res: Response) => {
        try {
            const { idM } = req.params
            const mtng = await Meeting.findById(idM)
            if (!mtng) {
                const error = new Error('Cita no encontrada')
                return res.status(404).json({ error: error.message })
            }
            await mtng.deleteOne()
            res.send('Cita cancelada')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }



}