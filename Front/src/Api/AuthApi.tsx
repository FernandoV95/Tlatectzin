
import { isAxiosError } from "axios"
import { api } from "../lib/Axios"
import { EmailForm, LoginForm, ValidCodForm } from "../schema/Users"


//Iniciar sesion
export async function login(formData: LoginForm) {
    try {
        const url = `/auth/login`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Validar Cuenta mediante el Codigo
export async function valAcct(formData: ValidCodForm) {
    try {
        const { data } = await api.post('/auth/valAcct', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Solicitar CODIGO por mensaje para cambiar la contraseña
export async function sendCod(formData: EmailForm) {
    try {
        const { data } = await api.post('/auth/sendCod', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

{/*Validar el Codigo para cambiar la contraseña*/ }
export async function valCodUpdtPss(formData: ValidCodForm) {
    try {
        const { data } = await api.post('/auth/valCodUpdtPss', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

//Solicita un nuevo Codigo
export async function reqCod(formData: EmailForm) {
    try {
        const { data } = await api.post('/auth/reqCod', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}
