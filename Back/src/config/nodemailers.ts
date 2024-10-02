import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

//Leer las variables de entorno
dotenv.config()
const config = () => {
    return {
        host: process.env.SMTP_HOST, //Esta en la .env
        port: +process.env.SMTP_PORT,  //Esta en la .env 
        auth: {
            user: process.env.SMTP_USER, //Esta en la .env
            pass: process.env.SMTP_PASS//Esta en la .env
        }
    };
};
export const transport = nodemailer.createTransport( config() );
