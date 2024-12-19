import {z} from 'zod'

export const userSchema=z.object({
    nombres: z.string(),
    apPat: z.string(),
    apMat: z.string(),
    tel: z.number().optional(),
    email: z.string().email(),
    pass: z.string(),
    pass_confirm: z.string(),
    token:z.string(),
    universidad: z.string(),
    cedula: z.string()
})

type Auth= z.infer<typeof userSchema>
//Para usuarios
export type NewUserForm = Pick< Auth, 'nombres'|'apPat'|'apMat'|'tel'|'email'|'pass'|'pass_confirm'>
export type NewVeterForm = Pick< Auth,'nombres'|'apPat'|'apMat'|'tel'|'email'|'pass'|'pass_confirm'| 'universidad'|'cedula'>
export type UpdtPssForm = Pick< Auth, 'pass'|'pass_confirm'>

//Para autenticacion
export type LoginForm = Pick< Auth,  'email'|'pass' >
export type ValidCodForm = Pick< Auth, 'token'>
export type EmailForm = Pick< Auth, 'email'> 
