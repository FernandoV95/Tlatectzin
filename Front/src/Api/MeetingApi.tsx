

import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllMtngSh, CitaForm, idForm } from "../schema/Meetings"


//Crear una cita
export async function nwMeeting(formData: CitaForm) {
    try {
        const { data } = await api.post(`/mtng/new`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Ver mis citas cita
export async function shwMtng() {
    try {
        const { data } = await api(`/mtng/show`);
        const response = AllMtngSh.safeParse(data)
        if(response.success){
            return response.data
        }
        return []
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

//Ver mis citas cita
export async function cnclMtng(id:idForm['_id']) {
    try {
        const { data } = await api.patch(`/mtng/cancel/${id}`); 
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}





