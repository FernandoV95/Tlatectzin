import type { Request, Response } from "express";
import User from "../models/Users";


export class Admind {
    //Ver a todos los usuarios
    static getUsers = async (req: Request, res: Response) => {

        try {

            const usrs = await User.find({})

            if (!usrs) {
                res.status(500).json({ error: 'No hay usuarios registrados' });
                return;
            }

            res.status(201).json(usrs)

        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }
}

