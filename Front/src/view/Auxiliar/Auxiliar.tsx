import React, { useState } from 'react';
import styles from "../../modules/Auxiliar.module.css";
import { useQuery } from '@tanstack/react-query';
import { showPetImgsId } from '../../Api/PetsApi';

const Auxiliar = () => {
  const idPet = "6773b1a07b21dd0f5c7424d1";
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
    <div className={styles.carouselContainer}>
      <button onClick={previousImage} className={styles.carouselButton}>←</button>
      {data?.imgs && data.imgs.length > 0 && (
        <div className={`${styles.carouselImage} w-80 h-80`}>
          <img className="w-full h-full" src={data.imgs[currentIndex]?.secure_url} alt={`Imagen ${currentIndex + 1}`} />
        </div>
      )}
      <button onClick={nextImage} className={styles.carouselButton}>→</button>
    </div>
  );
};

export default Auxiliar;
