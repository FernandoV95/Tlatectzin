

import { z } from 'zod'

const citaEsquema = z.object({
    _id: z.string(),
    fecha: z.string(),
    hora: z.string(),
    motivo: z.string(),
    comentarios: z.string(),
    N_cita: z.string(),
    alias: z.string(),
    start: z.string(),
    end: z.string(),
})


//Esto sirve para mostrar los datos con su tipado padrino
export const dashboardCita = z.array(
    citaEsquema.pick({
        _id: true,
        fecha: true,
        hora: true,
        motivo: true,
        comentarios: true,
        N_cita: true,
        alias: true,
        start: true,
        end: true,
    })
)

type Cita = z.infer<typeof citaEsquema>
export type idForm = Pick<Cita,"_id">
export type CitaForm = Pick<Cita, "fecha" | "hora" | "motivo" | "comentarios" | "alias">








