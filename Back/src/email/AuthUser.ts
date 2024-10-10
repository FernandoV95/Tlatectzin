import { transport } from "../config/nodemailers"

interface Iemail {
    email: string
    apPat?:string
    name: string
    token: string
}
export class AuthEmail {
    static sendConfirmationEmail = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Confirma tu cuenta',
            text: 'Confirma tu cuenta',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Hola 
            <span style="color: #007bff; font-weight: bold;">${user.name}</span>
            </p>
            <p>Gracias por sumarte a Tlatectzinc. 
            <p>Casi todo esta listo solo debes confirmar tu cuenta</p>
            <p style="text-align: center;">Ingresa tu codigo de seguridad</p>

            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }

    static updatePass = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Verifica que seas tu',
            text: 'Verifica que seas tu',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Hola
            <span style="color: #007bff; font-weight: bold;">${user.name}</span>
            </p>
            <p>Has solicitado cambiar tu contraseña. 
            <p>Si no fuiste tú, solo ignora el correo</p>
            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }

    static confimVeterinary = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: `Bienvenido, Dr(a).${user.name}`,
            text: `Bienvenido, Dr(a).${user.name}`,
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Bienvenido Dr(a). 
            <span style="color: #007bff; font-weight: bold;">${user.name} </span>
            <span style="color: #007bff; font-weight: bold;">${user.apPat}</span>
            </p>

            <p>Ahora forma parte de TLATECTZIN. 
            <p>Ingresa en el siguietne enlace para ingresar tu token y establecer tu nueva contraseña.
            <a href={""} style="font-size: 24px; font-weight: bold; color: #ff5733; text-decoration: none; background-color: #fff3cd; padding: 10px 15px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: background-color 0.3s;">
            ¡¡¡ Aquí !!! </a> 
            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }

    
    static updatePassVet = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Verifica que sea usted',
            text: 'Verifica que sea usted',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Hola Dr(a). 
            <span style="color: #007bff; font-weight: bold;">${user.name} </span>
            <span style="color: #007bff; font-weight: bold;">${user.apPat}</span>
            </p>
            <p>Ha solicitado cambiar su contraseña. 
            <p>Si no fue usted, solo ignore el correo</p>
            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }

    static reqTokenUser = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Nuevo Token',
            text: 'Nuevo Token',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Ya esta listo tu nuevo codigo de seguridad 
            <span style="color: #007bff; font-weight: bold;">${user.name} </span> 
            </p> 

            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }

    static reqTokenVet = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Nuevo Token',
            text: 'Nuevo Token',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
            Ya esta listo su nuevo codigo de seguridad Dr(a). 
            <span style="color: #007bff; font-weight: bold;">${user.name} </span>
            <span style="color: #007bff; font-weight: bold;">${user.apPat}</span>
            </p> 

            <p style="text-align: center;">Codigo de seguridad</p>
            <div style="text-align: center;">
                <p><b style="font-size: 25px;">${user.token}</b></p>
            </div>
            <p style="font-size: 30px;text-align: center;">¡Este codigo expira en 10 minutos!</p>
            `
        })
    }
}
