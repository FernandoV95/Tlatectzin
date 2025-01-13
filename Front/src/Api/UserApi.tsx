import { isAxiosError } from "axios"
import { api } from "../lib/Axios"    
import { NewUserForm, NewVeterForm, UpdtPssForm, ValidCodForm } from "../schema/Users"


//Crea nuevos usuarios
export async function newUser(formData: NewUserForm){
    try{
        const { data } = await api.post('/user/new',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

//Crea nuevos veterinario
export async function newVeter(formData: NewVeterForm){
    try{
        const { data } = await api.post('/user/newVeter',formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

//Cambiar contraseña
export async function updtPss({formData,token}: {formData: UpdtPssForm, token:ValidCodForm['token']}){
    try{
        const { data } = await api.patch(`/user/updtPss/${token}`,formData)
        return data
    }catch(error){
       if(isAxiosError(error) && error.response)
       throw new Error(error.response.data.error)
    }
}

