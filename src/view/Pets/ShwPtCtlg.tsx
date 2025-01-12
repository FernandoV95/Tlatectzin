import { useQuery } from "@tanstack/react-query";
import { idForm } from "../../schema/Pets";
import { shwPetsID } from "../../Api/PetsApi";
import styles from "../../modules/catalogo.module.css";
import { useState } from "react";
import ModalCatalogo from "../../components/Pets/ModalCatalogo";

type ShwPtCtlgProps = {
    idPet: idForm['_id'];
};

function ShwPtCtlg({ idPet }: ShwPtCtlgProps) {
    const [cambiarVentana, setCambiarVentana] = useState(false);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pet', idPet],
        queryFn: () => shwPetsID(idPet),
        enabled: true,
    });

    if (isLoading) return <p>Cargando...</p>;
    if (isError) {
        // Mejora en la gestión de errores
        const errorMessage = error instanceof Error ? error.message : 'Hubo un error inesperado';
        return <p>{`Error: ${errorMessage}`}</p>;
    }
    

    if (data) {
        const { alias, vacunas, longDesc, imagenes } = data;
        return (
            <>
                {!cambiarVentana ? (
                    // Datos
                    <div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div>
                                {/* Título */}
                                <h2 className={`${styles.modalTitle} text-3xl`}>
                                    {alias || "Sin nombre"}
                                </h2>

                                {/* Vacunas */}
                                <div className="flex gap-2">
                                    {vacunas?.map((vacuna: string, index: number) => (
                                        <strong key={`vacuna-${index}`} className="border border-cyan-500 p-1">
                                            {vacuna}
                                        </strong>
                                    ))}
                                </div>

                                {/* Descripción larga */}
                                <div>
                                    <p>{longDesc || "No disponible"}</p>
                                </div>
                            </div>

                            {/* Imagen Principal */}
                            <div className="h-auto">
                                <img alt={alias} src={imagenes[0]?.secure_url} />
                            </div>
                        </div>

                        {/* Catálogo de imágenes */}
                        <div className="grid grid-cols-3 gap-2">
                            {imagenes?.map((imagen: { secure_url: string } ) => (
                                <div
                                    key={imagen.secure_url}
                                    className="w-40 h-40 hover:cursor-pointer hover:scale-110 hover:transition-transform hover:duration-300"
                                >
                                    <img
                                        alt={alias}
                                        src={imagen.secure_url}
                                        className="w-full h-full"
                                        onClick={() => setCambiarVentana(true)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <ModalCatalogo idPet={idPet} setCambiarVentana={setCambiarVentana } />
                    </div>
                )}
            </>
        );

    }

    return null;
}

export default ShwPtCtlg;
