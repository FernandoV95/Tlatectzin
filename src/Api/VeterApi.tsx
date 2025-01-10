

import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllMtngSh, CitaForm, idForm } from "../schema/Meetings"


//Ver mis citas cita
export async function shwMtngVeter() {
    try {
        const { data } = await api(`/vet/meetings`);
       const response = AllMtngSh.safeParse(data)
        if (response.success) {
            return response.data
        }
        return []
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}