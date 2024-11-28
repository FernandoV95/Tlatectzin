import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Leer las variables de entorno
dotenv.config();

const config = () => {
    return {
        host: process.env.SMTP_HOST, // Está en la .env
        port: Number(process.env.SMTP_PORT), // Está en la .env 
        auth: {
            user: process.env.SMTP_USER, // Está en la .env
            pass: process.env.SMTP_PASS // Está en la .env
        },
        debug: true, // Añade esta línea para ver más detalles del proceso de conexión
    };
};

export const transport = nodemailer.createTransport(config());
