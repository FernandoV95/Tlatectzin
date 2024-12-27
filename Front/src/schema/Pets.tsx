import { z } from 'zod'

// Esquema para una imagen de mascota (referencia a PetImg)
const petImgSchema = z.object({
    petId: z.string(),  // ID de la mascota
    public_id: z.string(),
    secure_url: z.string()
})

// Esquema para una mascota
export const petSchema = z.object({
    _id: z.string(),
    alias: z.string(),
    tipo: z.string(),
    vacunas: z.array(z.string()),
    shortDesc: z.string(),
    longDesc: z.string(),
    imagenes: z.array(z.string())  // Aquí es un array de ObjectId como string
})

// Esquema para mostrar datos de las mascotas
export const AllPetSh = z.array(
    petSchema.pick({
        _id: true,
        alias: true,
        tipo: true,
        vacunas: true,
        shortDesc: true,
        longDesc: true,
        imagenes: true,
    })
)


// Esquema para mostrar imagenes de las mascotas
export const AllPetImgSh = z.array(
    petImgSchema.pick({
        petId: true,  // ID de la mascota
        public_id: true,
        secure_url: true,
    })
)
