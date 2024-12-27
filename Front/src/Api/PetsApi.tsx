
import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllPetSh } from "../schema/Pets"

//Mostrar las datos de la mascota
export async function shwDataPet() {
    try {
        const { data } = await api('/pets/show')
        const response = AllPetSh.safeParse(data)
        return response
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Mostrar las imagenes de las mascotas
export async function shwImgPet() {
    try {
        const { data } = await api('/pets/show')
        const response = AllPetSh.safeParse(data)
        return response
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}