import { useState } from "react";
import { idForm } from "../../schema/Pets";
import { useQuery } from "@tanstack/react-query";
import { showPetImgsId } from "../../Api/PetsApi";
import styles from "../../modules/ModalCatalogo.module.css";

type ShwPtCtlgProps = {
    idPet: idForm['_id'];
    setCambiarVentana: React.Dispatch<React.SetStateAction<boolean>>
};

function ModalCatalogo({ idPet, setCambiarVentana }: ShwPtCtlgProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['imgs', idPet],
        queryFn: () => showPetImgsId(idPet),
        enabled: !!idPet,
    });

    const previousImage = () => {
        setCurrentIndex((prevIndex) => {
            const imgsLength = data?.imgs?.length;
            if (imgsLength === undefined) return prevIndex;
            return prevIndex === 0 ? imgsLength - 1 : prevIndex - 1;
        });
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => {
            const imgsLength = data?.imgs?.length;
            if (imgsLength === undefined) return prevIndex;
            return prevIndex === imgsLength - 1 ? 0 : prevIndex + 1;
        });
    };
    return (
        <>
            <div className={styles.carouselContainer}>
                <button onClick={previousImage} className={styles.carouselButton}>←</button>
                {data?.imgs && data.imgs.length > 0 && (
                    <div className={`${styles.carouselImage} w-80 h-80`}>
                        <img className="w-full h-full" src={data.imgs[currentIndex]?.secure_url} alt={`Imagen ${currentIndex + 1}`} />
                    </div>
                )}
                <button onClick={nextImage} className={styles.carouselButton}>→</button>
            </div>
            <div className=" flex justify-center ">
                <button onClick={() => setCambiarVentana(false)}
                    className=" p-2 rounded-full bg-[rgb(69,160,73)] text-2xl hover:cursor-pointer hover:scale-110 hover:transition-transform hover:duration-300">
                    Regresar
                </button>
            </div>
        </>
    );
}

export default ModalCatalogo