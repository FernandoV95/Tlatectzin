import { isAxiosError } from "axios"
import { api } from "../lib/Axios"   
import { EmailForm, LoginForm, PassResetForm, RegisterUserForm, ValidTokenForm } from "../schema/RegisterUser"


 
export async function newUser(formData: RegisterUserForm){
    try{
        const { data } = await api.post('/auth/new-user',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function validateAccountToken(formData: ValidTokenForm){
    try{
        const { data } = await api.post('/auth/confirm-account',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function forgotPass(formData: EmailForm){
    try{
        const { data } = await api.post('/auth/forgot-pass',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function validateResetToken(formData: ValidTokenForm){
    try{
        const url =`/auth/valid-reset-token`
        const { data } = await api.post<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function resetPass({formData,token}:{formData: PassResetForm,token:ValidTokenForm['token']}){
    try{
        const url = `/auth/reset-pass/${token}`
        const { data } = await api.post<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function login(formData:LoginForm){
    try{
        const url = `/auth/login`
        const { data } = await api.post<string>(url,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

export async function requestToken(formData: EmailForm){
    try{
        const { data } = await api.post('/auth/request-token',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}