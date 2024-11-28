import { transport } from "../config/nodemailers"

interface Iemail {
    email: string
    apPat?: string
    name: string
    token: string
}
export class AuthEmail {
    static sendConfirAccnt = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - from@example.com',
            to: user.email,
            subject: 'Confirma tu cuenta',
            text: 'Confirma tu cuenta',
            html: `
                <p style="font-size: 20px; color: #333; font-weight: bold;">
                    Bienvenido 
                    <span style="color: #007bff; font-weight: bold;">${user.name}</span>
                    a Tlateczinc
                </p>
    
                <p style="text-align: justify; font-size: 20px; color: #333;" >
                Nos complace informarte que tu registro ha sido completado con éxito. 
                Ahora, para garantizar la seguridad de tu cuenta, solo necesitamos que valides 
                tu información mediante el código de seguridad que aparece a continuación:</p>
    
                <p style="text-align: center; font-size: 20px; color: #333; font-weight: bold">Código de seguridad:</p>
                <div style="text-align: center;">
                    <p style="font-size: 25px; font-weight: bold; color: #388E3C;">${user.token}</p>
                </div>

                <p style="font-size: 30px; text-align: center; color: #d9534f; font-weight: bold;">
                    ¡Este código expira en 10 minutos
                </p>
    
                <p style="text-align: justify; font-size: 20px; color: #333;">
                Una vez que ingreses el código y completes la validación, podrás acceder a todas las 
                funciones y servicios que ofrecemos, sin ninguna restricción.</p>

                <p style="text-align: justify; font-size: 20px; color: #333;">
                Sí tu codigo de validacion expiro puedes solicitar uno nuevo
                </p>
                

                <p>Si no has solicitado este registro, por favor ignora este mensaje.</p>
            `
        });
    }

    static forgotPss = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Actualizar contraseña',
            text: 'Actualizar contraseña',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
                ¡Hola 
                <span style="color: #007bff; font-weight: bold;">${user.name}</span>¡
            </p>
    
            <p style="text-align: justify; font-size: 20px; color: #333;" >
            Hemos recibido una solicitud para cambiar tu contraseña. Para continuar con el proceso, 
            por favor ingresa el siguiente código de seguridad en nuestro sitio web:
            </p>

            <p style="text-align: center; font-size: 20px; color: #333; font-weight: bold">Código de seguridad:</p>
                <div style="text-align: center;">
                    <p style="font-size: 25px; font-weight: bold; color: #388E3C;">${user.token}</p>
                </div>

            <p style="font-size: 30px; text-align: center; color: #d9534f; font-weight: bold;">
            ¡Este código expira en 10 minutos
            </p>

                
            <p style="text-align: justify; font-size: 20px; color: #333;" >
            Este código es válido por un tiempo limitado, así que asegúrate de 
            ingresarlo antes de que expire. Si no solicitaste este cambio, por favor 
            ignora este mensaje.
            </p>

            `
        })
    }

    static reqCodUser = async (user: Iemail) => {
        const info = await transport.sendMail({
            from: 'Tlatectzin - fernando.a.ventura20@gmail.com',
            to: user.email,
            subject: 'Nuevo Codigo de Seguridad',
            text: 'Nuevo Codigo de Seguridad',
            html: `
            <p style="font-size: 20px; color: #333; font-weight: bold;">
                ¡Hola 
                <span style="color: #007bff; font-weight: bold;">${user.name}</span>¡
            </p>


            <p style="text-align: justify; font-size: 20px; color: #333;">
            Hemos recibido tu solicitud para generar un nuevo código de autenticación, 
            ya que el código anterior ha vencido o no es válido.
            Para continuar con el proceso de verificación, por favor utiliza el siguiente código:
            </p>

             <p style="text-align: center; font-size: 20px; color: #333; font-weight: bold">Código de seguridad:</p>
                <div style="text-align: center;">
                    <p style="font-size: 25px; font-weight: bold; color: #388E3C;">${user.token}</p>
                </div>

            <p style="font-size: 30px; text-align: center; color: #d9534f; font-weight: bold;">
                    ¡Este código expira en 10 minutos
            </p>

            <p style="text-align: justify; font-size: 20px; color: #333;" >
            Este código es válido por un tiempo limitado, así que asegúrate de 
            ingresarlo antes de que expire. Si no solicitaste este cambio, por favor 
            ignora este mensaje.
            </p>

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


}
