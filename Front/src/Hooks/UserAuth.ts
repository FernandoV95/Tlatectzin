import { useQuery } from "@tanstack/react-query"
import { getUSer } from "../Api/AuthApi" 



export const useAuth = () => {
 
    const { data, isError, isLoading } = useQuery({
        queryKey: ['perfil'],
        queryFn: getUSer,
        retry: 1,
        refetchOnWindowFocus: false,
    })
 
    return { data, isError, isLoading }
}