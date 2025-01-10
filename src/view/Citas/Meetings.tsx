import styles from "../../modules/Citas.module.css";
import { useAuth } from '../../Hooks/UserAuth';
import { Navigate } from 'react-router-dom';
import Agendar from "../../components/meeting/Agendar";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

function Meetings() {
    const { data, isLoading } = useAuth();
    const noMostrar = useRef(false);

    useEffect(() => {
        if (!data && !noMostrar.current) {
            toast.error('Debes iniciar sesión primero 😕');
            noMostrar.current = true; // Marca que el error ha sido mostrado
        }
    }, [data]);

    // Si aún está cargando
    if (isLoading) {
        return (
            <div className={`${styles.cajita} pt-4`}>
                <p className="text-white">Cargando....</p>
            </div>
        );
    }

    // Si no hay datos, mandalo a inicar sesion
    if (!data) {
        return <Navigate to="/auth/login" />;
    }

    // Si hay datos, muestra la vista
    if (data) return (
        <div>
            <Agendar />
        </div>
    );
}

export default Meetings;
