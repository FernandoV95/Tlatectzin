
import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllUsrsSh, EmailForm, UpdtUserForm } from "../schema/Users"
import { idForm } from "../schema/Meetings";



//Ver a todos los usuarios /admind/
export async function shwUsrs() {
    try {
        const { data } = await api(`/admind/AllUsers`);
        const response = AllUsrsSh.safeParse(data);
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Buscar al usuario por ID
export async function getUsrId(id:idForm['_id']) {
    try {
        const { data } = await api(`/admind/user/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Actualizar datos del usuario por ID
export async function updtUsrId({formData,idUser}:{formData:UpdtUserForm,idUser:idForm['_id']}) {
    try {
        const { data } = await api.put<string>(`/admind/user/updt/${idUser}`,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}


//Enviar el correo al veterinario para registrarse
export async function sendEmail(formData: EmailForm) {
    try {
        const { data } = await api.post(`/admind/sendEmailVeter`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}