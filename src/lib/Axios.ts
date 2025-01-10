import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


api.interceptors.request.use(config => {
    const tkn = localStorage.getItem('AUTH_TOKEN')
    if(tkn){
        config.headers.Authorization = `Bearer ${tkn}`
    }
    return config 
})

