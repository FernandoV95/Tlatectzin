import jwt from "jsonwebtoken";
import Types from 'mongoose'

/*
type UserPayLoad = {
    id: string;
}
    */
type UserPayLoad = {
    id: Types.ObjectId
}  

export const generateJWT = (payload: UserPayLoad) => {
    //sign crea el jwt
    //expiresIn mantiene abierta tu sesión n tiempo
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}
