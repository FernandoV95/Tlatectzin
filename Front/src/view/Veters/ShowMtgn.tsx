import React, { useEffect, useRef } from 'react'
import { useAuth } from '../../Hooks/UserAuth';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import styles from "../../modules/showCitas.module.css" 
import MisPcientes from '../../components/Veterinarios/MisPacientes';

function ShowMtgn() {
    const { data, isLoading } = useAuth()
    const noMostrar = useRef(false);

    useEffect(() => {
        if (!data && !noMostrar.current) {
            toast.error('Debes iniciar sesión primero 😕');
            noMostrar.current = true; // Marca que el error ha sido mostrado
        }
    }, [data]);

    //Si esta cargando
    if (isLoading)
        return (
            <div className={`${styles.cajita}`}>
                <p className="text-white">Cargando....</p>
            </div>
        )

    // Si no hay datos, mandalo a inicar sesion
    if (!data) {
        return <Navigate to="/auth/login" />;
    }


    return (
        <>
            <MisPcientes name={data.nombres}/>
        </>
    )
}

export default ShowMtgn