import {z} from 'zod'

export const userSchema=z.object({
    nombres: z.string(),
    apPat: z.string(),
    apMat: z.string(),
    tel: z.number().optional(),
    email: z.string().email(),
    pass: z.string(),
    pass_confirm: z.string(),
    token:z.string()
})

type Auth= z.infer<typeof userSchema>
export type RegisterUserForm = Pick< Auth, 'nombres'|'apPat'|'apMat'|'tel'|'email'|'pass'|'pass_confirm'>
export type ValidTokenForm = Pick< Auth, 'token'>
export type EmailForm = Pick< Auth, 'email'>
export type PassResetForm = Pick< Auth,  'pass'|'pass_confirm'>
export type LoginForm = Pick< Auth,  'email'|'pass' >