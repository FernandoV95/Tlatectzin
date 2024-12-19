
import { isAxiosError } from "axios"
import { api } from "../lib/Axios" 
import { EmailForm } from "../schema/Users"


//Enviar el correo al veterinario para registrarse
export async function sendEmail(formData:EmailForm) {
    try {
        const {data} = await api.post(`/admind/sendEmailVeter`,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}