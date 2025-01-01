import { z } from 'zod'

// Esquema para una imagen de mascota (referencia a PetImg)
const petImgSchema = z.object({
    _id: z.string(), // Id de la imagen
    petId: z.string(), // Asegúrate de que sea un string de 24 caracteres
    public_id: z.string(),
    secure_url: z.string()
});



// Esquema para una mascota
export const petSchema = z.object({
    _id: z.string(),
    alias: z.string(),
    status: z.string(),
    tipo: z.string(),
    vacunas: z.array(z.string()),
    shortDesc: z.string(),
    longDesc: z.string(),
    imagenes: z.array(petImgSchema)
})


type Pet = z.infer<typeof petSchema>
export type idForm = Pick<Pet, "_id">
export type newPetForm = Pick<Pet, "alias" | "tipo" | "vacunas" | "shortDesc" | "longDesc">
export type PetForm = Pick<Pet, "_id" | "alias" | "status" | "tipo" | "vacunas" | "shortDesc" | "longDesc">;
export type updtDataPetForm = Pick<Pet, "alias" | "status" | "shortDesc" | "longDesc" | "vacunas">

type PetImgs = z.infer<typeof petImgSchema>
export type idImgPetForm = Pick<PetImgs, "_id">
export type petIdForm = Pick<PetImgs, "petId">
export type PetImgsForm = Pick<PetImgs, "_id" | "petId" | "public_id" | "secure_url">


// Esquema para mostrar datos de las mascotas
export const AllPetSh = z.array(
    petSchema.pick({
        _id: true,
        status: true,
        alias: true,
        tipo: true,
        vacunas: true,
        shortDesc: true,
        longDesc: true,
        imagenes: true,
    })
)


// Esquema para mostrar imagenes de las mascotas
export const AllPetImgSh2 = z.array(
    petImgSchema.pick({
        _id: true,
        petId: true,  // ID de la mascota
        public_id: true,
        secure_url: true,
    })
);

export const AllPetImgSh = z.object({
    imgs: z.array(
        petImgSchema.pick({
            _id: true,
            petId: true,
            public_id: true,
            secure_url: true
        })
    )
});