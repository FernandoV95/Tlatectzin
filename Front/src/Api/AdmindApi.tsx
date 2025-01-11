
import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { AllUsrsSh, EmailForm, idUserForm, UpdtUserForm } from "../schema/Users"
import { AllMtngSh, disponibles, idForm, } from "../schema/Meetings";



//Ver a todos los usuarios /admind/
export async function shwUsrs() {
    try {
        const { data } = await api(`/admind/AllUsers`);
        const response = AllUsrsSh.safeParse(data);
        if (response.success) {
            return response.data
        }
        return []
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Buscar al usuario por ID
export async function getUsrId(id: idForm['_id']) {
    try {
        const { data } = await api(`/admind/user/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Actualizar datos del usuario por ID
export async function updtUsrId({ formData, idUser }: { formData: UpdtUserForm, idUser: idForm['_id'] }) {
    try {
        const { data } = await api.put<string>(`/admind/user/updt/${idUser}`, formData)
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

//Ver todas las cita
export async function getMtng() {
    try {
        const { data } = await api(`/admind/show/mtngs`);
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

//Ver la cita por id
export async function getMtngId(id: idForm['_id']) {
    try {
        const { data } = await api(`/admind/show/mtngs/${id}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


//Buscamos citas con fecha y hora similares pero con veterinarios disponibles
export async function vetersAvailable({ idCita }: { idCita: idUserForm['_id'] }) {
    try {
        const { data } = await api(`/admind/show/mtng/${idCita}/veter-available/`);
        const response = disponibles.safeParse(data);

        if (response.success) {
            return response.data;
        } else {
            // En caso de error, retornar una estructura vacía válida o manejar el error.
            return { veterAvlbl: [], fecha: '', hora: '' };
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;  // Asegúrate de lanzar el error si no es un error de Axios
    }
}

//Asignamos el veterinario
export async function assignVeter({ formData, idCita }: { formData: any, idCita: idUserForm['_id'] }) {
    try {
        const { data } = await api.patch(`/admind/show/mtng/${idCita}/assign-veter/`, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}


///show/mtng/:idM/veter-available/

