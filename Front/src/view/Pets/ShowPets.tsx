import { useQuery } from "@tanstack/react-query"
import { shwDataPet , shwImgPet } from "../../Api/PetsApi"


export default function ShowPets() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['Pets'],
        queryFn: shwImgPet,
        enabled: true
    })

    if (isLoading) {
        return (
            <div className="">
                <p>Cargando...</p>
            </div>
        )
    }


    if (isError) {
        return (
            <div className="">
                <p>Hubo problemas con el servidor</p>
            </div>
        )
    }

console.log(data)

    if (data) return (
        <div>Ver consola</div>
    )
}

