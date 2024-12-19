import { z } from 'zod'

export const citaSchema = z.object({
    _id: z.string(),
    alias: z.string(),
    fecha: z.string(),
    hora: z.string(),
    motivo: z.string(),
    comentarios: z.string(),
    status: z.string(),
    N_cita: z.number(),
    start: z.string(),
    end: z.string(),
})


type Cita = z.infer<typeof citaSchema>
export type idForm = Pick<Cita,"_id">
export type CitaForm = Pick<Cita, "fecha" | "hora" | "motivo" | "comentarios" | "alias">

//Esquema para MOSTRAR los datos 
export const AllMtngSh = z.array(
    citaSchema.pick({
        _id:true,
        alias:true,
        fecha:true,
        hora:true,
        motivo:true,
        comentarios:true,
        status:true,
        N_cita:true,
        start:true,
        end:true,
    })
)








