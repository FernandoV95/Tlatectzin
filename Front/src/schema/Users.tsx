import { z } from 'zod'

export const userSchema = z.object({
    _id: z.string(),
    nombres: z.string(),
    apPat: z.string(),
    apMat: z.string(),
    tel: z.string(),
    email: z.string().email(),
    pass: z.string(),
    pass_confirm: z.string(),
    token: z.string(),
    rol: z.string(),
    universidad: z.string().optional(),
    cedula: z.string().optional(),    
    confirmed: z.boolean()
})

//Esquema para MOSTRAR los datos 
export const AllUsrsSh = z.array(
    userSchema.pick({
        _id: true,
        nombres: true,
        apPat: true,
        apMat: true,
        tel: true,
        email: true,
        rol: true,
        universidad: true,
        cedula: true,
        confirmed: true,
    })
)




type Auth = z.infer<typeof userSchema>
//Para usuarios
export type idUserForm = Pick<Auth, '_id'>
export type NewUserForm = Pick<Auth, 'nombres' | 'apPat' | 'apMat' | 'tel' | 'email' | 'pass' | 'pass_confirm'>
export type NewVeterForm = Pick<Auth, 'nombres' | 'apPat' | 'apMat' | 'tel' | 'email' | 'pass' | 'pass_confirm' | 'universidad' | 'cedula'>
export type UpdtPssForm = Pick<Auth, 'pass' | 'pass_confirm'>
export type VeterFrom = Pick<Auth, '_id' | 'nombres'>

//Para autenticacion
export type LoginForm = Pick<Auth, 'email' | 'pass'>
export type ValidCodForm = Pick<Auth, 'token'>
export type EmailForm = Pick<Auth, 'email'> 
export type AuthForm = Pick<Auth, 'nombres' | "rol">

//Para la administracion
export type UpdtUserForm = Pick<Auth,'_id' |'nombres' | 'apPat' | 'apMat' | 'tel' | 'email' | 'rol' | 'universidad'| 'cedula' >
