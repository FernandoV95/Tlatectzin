import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getMtngId } from '../../Api/AdmindApi';


type AsignarVetProps = {
    idCita: string
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function AsignarVetr({idCita, setVisible}:AsignarVetProps) {



    //---------------> Controladores del UseMutation y useQuery <---------------
    const { data, isLoading, isError } = useQuery({
        queryKey: ['UsrsMtng', idCita],
        queryFn: () => getMtngId(idCita),
        retry: 1
    });

    return (
        <>
        </>
    )
}

export default AsignarVetr