import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { newImgPets } from '../../Api/PetsApi';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from "../../modules/NewPet.module.css";

type petImgProps = {
    idPet: string
}

function NewImgPet({ idPet }: petImgProps) {
    const goShowPets = useNavigate();
    const [imgData, setImgData] = useState<File[]>([]);

    // Para subir las imagenes al id correspondiente
    const { mutate } = useMutation({
        mutationFn: newImgPets,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            goShowPets('/admind/pets/show')
        },
    });


    //Almacena las iamgenes en el array
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Convertimos FileList a un array de File correctamente
            setImgData(prevImgs => [...prevImgs, ...Array.from(e.target.files as FileList)]);
        }
    };


    //Borrar imagenes
    const handleDelete = (index: number) => {
        setImgData(prevImgs => prevImgs.filter((_, i) => i !== index));
    };


    // Manejo del envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imgData.length === 0) {
            toast.error('Por favor selecciona al menos una imagen');
            return;
        }

        mutate({ imgData, idPet });
    };

    return (
        <>
            <div className={`${styles.wrapper} w-11/12 m-auto`}>
                <h2 className='w-full text-center'>Necesitamos algunas imágenes</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='w-11/12 m-auto flex justify-center'>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .webp"
                            className='border-0'
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className='w-4/5 m-auto grid grid-cols-4 justify-center gap-2 mt-2  '>
                        {imgData.length > 0 && (
                            <>
                                {imgData.map((file, index) => (
                                    <div className='relative' key={index}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`preview-${index}`}
                                            className='w-44 h-36'
                                        />
                                        <button
                                            className='absolute p-1 top-2 left-32 bg-red-800 text-white rounded-full hover:scale-110 transition duration-300'
                                            onClick={(e) => {
                                                e.preventDefault(); // Previene que el formulario se envíe
                                                handleDelete(index); // Llama a la función de eliminar
                                            }}
                                        >
                                            <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>


                    <div className=" text-2xl w-1/3 mx-auto mt-2 ">
                        <input type="submit" value="Enviar" className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>

                </form>
            </div>
        </>
    );
}

export default NewImgPet