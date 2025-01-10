import { useQuery } from "@tanstack/react-query";
import { catalog } from "../../Api/PetsApi";
import { TypeAnimation } from 'react-type-animation';
import styles from "../../modules/catalogo.module.css";
import SmplMdl from "../../components/modals/SmplMdl";
import { useState } from "react";
import ShwPtCtlg from "./ShwPtCtlg";
import { idForm } from "../../schema/Pets";
import { useNavigate } from "react-router-dom";

function Catalogo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [abrir, setAbrir] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [idPet, setIdPet] = useState<idForm['_id']>('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const goAgendar = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['catalogo'],
        queryFn: catalog,
        enabled: true,
    });

    // Filtrar los datos si hay algo en el filtro
    const datosFiltrados = data && data.filter(item =>
        item.tipo.toLowerCase().includes(filtroTipo.toLowerCase()) ||
        item.alias.toLowerCase().includes(filtroTipo.toLowerCase())
    ) || [];

    // Manejar el cambio en el input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroTipo(e.target.value);
    };

    // Calcular las paginas necesarias para las mascotas filtradas
    const paginasTotales = Math.ceil(datosFiltrados.length / itemsPerPage);

    // Cambiar de página
    const goToPage = (page: number) => {
        if (page > 0 && page <= paginasTotales) {
            setCurrentPage(page);
        }
    };

    // Abrir el modal y seleccionar la mascota
    const toggleModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const idPet = e.target as HTMLElement;
        setIdPet(idPet.id);
        setAbrir(true); // Abrir el modal
    };

    if (isLoading) return <p>Cargando....</p>;
    if (isError) return <p>Hay problemas con el servidor</p>;

    if (data) return (
        <>
            <div className={`${styles.cajita}`}>

                <div className="w-11/12 m-auto">
                    <div className="w-4/5 flex justify-center">
                        <TypeAnimation
                            sequence={[
                                1500, // Waits 3s
                                'Bienvenido al', // Types 'Bienvenido al'
                                1500, // Waits 1s
                                'Catálogo de', // Types 'Catálogo de'
                                1500, // Waits 4s
                                'Mascotas', // Types 'Mascotas'
                                1500, // Waits 3s
                                () => { },
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{
                                fontSize: '2em',
                                display: 'inline-block',
                                textAlign: 'center',
                                color: "white",
                            }}
                        />
                    </div>

                    {/* Campo de búsqueda */}
                    <input
                        type="text"
                        placeholder="Busca por tipo de mascota o alias"
                        value={filtroTipo}
                        onChange={handleInputChange}
                        className={`${styles.searchInput}`}
                    />

                    {/* Tarjeta */}
                    <div className={`${styles.cardContainer}`}>
                        {datosFiltrados && datosFiltrados.length > 0 ? (
                            datosFiltrados.map((mascota) => (
                                <div key={mascota._id} className={`${styles.cardWrapper}`}>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.cardImagePlaceholder}`}>
                                            {mascota.imagenes[0] ? (
                                                <img src={mascota.imagenes[0].secure_url} alt={mascota.alias} />
                                            ) : (
                                                <div>No hay imagen</div>
                                            )}
                                        </div>
                                        <h3>{mascota.alias}</h3>
                                        <p className="text-2xl">{mascota.tipo}</p>
                                        <p>{mascota.shortDesc}</p>
                                        <div className={`${styles.cardButtons}`}>
                                            <button
                                                id={mascota._id}
                                                className={`${styles.viewButton}`}
                                                onClick={(e) => toggleModal(e)} // Pasar la mascota seleccionada
                                            >
                                                Ver Mascota
                                            </button>
                                            <button onClick={ ()=> goAgendar('/mtng/new')} className={`${styles.adoptButton}`}>Adoptar</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h3 className=" text-white w-full">
                                    No se encontraron resultados
                                </h3>
                            </div>
                        )}
                    </div>

                    {/* Paginación */}
                    <div className={`${styles.pagination}`}>
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        {Array.from({ length: paginasTotales }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === paginasTotales}>
                            Siguiente
                        </button>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {abrir &&
                <SmplMdl
                    open={abrir}
                    setVisible={setAbrir} // Aquí se pasa setAbrir para controlar el cierre del modal
                    children={<ShwPtCtlg idPet={idPet} />} // Pasar el id de la mascota al modal
                />
            }
        </>
    );
}

export default Catalogo;
