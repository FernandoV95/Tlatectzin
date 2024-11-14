

import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { CitaForm, idForm } from "../schema/Meetings"


//Crear una cita
export async function nwMeeting(formData:CitaForm) {
    try {
        const {data} = await api.post(`/mtng`,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}


//Actualizar los datos
export async function getByID(id:idForm) {
    try {
        const {data} = await api(`/mtng/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

