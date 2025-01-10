import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/Users'


interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({ error: error.message })
    }
    const [, tkn] = bearer.split(' ')
    try {
        //Verifica que el token sea valido o no hay aexpirado
        const decoded = jwt.verify(tkn, process.env.JWT_SECRET) as DecodedToken;
        //Buscamos al usuario
        const user = await User.findById(decoded.id).select('_id nombres email rol cedula')
        if (!user) {
            res.status(500).json({ error: 'Token No Válido' })
            return
        }
        //retornamos al usuario 
        req.user = user
    } catch (error) {
        res.status(500).json({ error: 'Token No Válido' })
        return 
    }
    next()
}