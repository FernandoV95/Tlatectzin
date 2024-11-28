import { isAxiosError } from "axios"
import { api } from "../lib/Axios"   
import { EmailForm, LoginForm, PassResetForm, RegisterUserForm, ValidTokenForm } from "../schema/RegisterUser"


//Crea nuevos usuarios
export async function newUser(formData: RegisterUserForm){
    try{
        const { data } = await api.post('/user',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

//Autenticar Cuenta mediante el Codigo
export async function validCodAccnt(formData: ValidTokenForm){
    try{
        const { data } = await api.post('/user/valAcct', formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function login(formData:LoginForm){
    try{
        const url = `/user/login`
        const { data } = await api.post<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function forgotPass(formData: EmailForm){
    try{
        const { data } = await api.post('/user/forgotPass',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function validateResetToken(formData: ValidTokenForm){
    try{
        const url =`/user/valCod`
        const { data } = await api.post<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function resetPass({formData,token}:{formData: PassResetForm,token:ValidTokenForm['token']}){
    try{
        const url = `/user/updtPss/${token}`
        const { data } = await api.patch<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function requestToken(formData: EmailForm){
    try{
        const { data } = await api.post('/user/reqCod',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}