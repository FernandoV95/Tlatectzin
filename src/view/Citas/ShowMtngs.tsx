
import { Navigate } from 'react-router-dom'
import MisCitas from '../../components/meeting/MisCitas'
import { useAuth } from '../../Hooks/UserAuth'
import styles from "../../modules/showCitas.module.css"
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

function ShowMtngs() {
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
            <MisCitas name={data.nombres}/>
        </>
    )
}

export default ShowMtngs