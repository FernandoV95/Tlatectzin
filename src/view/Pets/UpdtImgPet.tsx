
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteImgPetById, newImgPets, showPetImgsId } from '../../Api/PetsApi';
import { DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { idImgPetForm } from '../../schema/Pets';


type updtPetProps = {
    idPet: idImgPetForm['_id']
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCambiarVentana: React.Dispatch<React.SetStateAction<boolean>>;
}
//UpdtImgPet

function UpdtImgPet({ idPet, setVisible, setCambiarVentana }: updtPetProps) {

    const [addImagenes, setAddImagenes] = useState<File[]>([]);

    //Trae los datos de la base de datos
    const { data, isLoading, isError } = useQuery({
        queryKey: ['ImgsPet', idPet],
        queryFn: () => showPetImgsId(idPet),
        enabled: true,
    });


    //va a agregar mas iamgenes 
    const queryClient = useQueryClient();
    const { mutate: mutateNewImg } = useMutation({
        mutationFn: newImgPets,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['ImgsPet'] })
            toast.success(data)
        }
    })

    //Va a eliminar unsa sola imagen 
    const { mutate: mutateDeleteImg } = useMutation({
        mutationFn: deleteImgPetById,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['ImgsPet'] })
            toast.success(data)
        }
    })


    //Almacena las iamgenes en el array
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAddImagenes(prevImgs => [...prevImgs, ...Array.from(e.target.files as FileList)]);
        }
    };

    //Borrar imagenes (nuevas)
    const handleDelete = (index: number) => {
        setAddImagenes(prevImgs => prevImgs.filter((_, i) => i !== index));
    };

    //Borra las imagenes ya almacenadas
    const handleDltImg = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let idPet = e.currentTarget.parentElement?.id
        let idImg = e.currentTarget.parentElement?.parentElement?.id
        if (!idPet || !idImg) {
            console.error("No se pudieron obtener los IDs necesarios.");
            return;
        }
        mutateDeleteImg({ idImg, idPet })
    }

    // Agrega las nuevas imagenes
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutateNewImg({ imgData: addImagenes, idPet });
        setCambiarVentana(false)
        setVisible(false)
    };


    if (isLoading) return (<p>Cargando....</p>);

    if (isError) return (<p>Hubo problemas en el servidor</p>);



    if (data && Array.isArray(data.imgs)) {
        return (
            <>
                <h2 className='w-full text-center'>Edita tus fotos</h2>
                <form onSubmit={handleSubmit} noValidate>

                    <div className="mb-4 w-11/12 m-auto flex justify-center">
                        <input type="file" accept=".jpg, .jpeg, .png, .webp"
                            className='border-0'
                            multiple onChange={handleFileChange}
                        />
                    </div>

                    {/* Imagenes Almacenadas */}
                    <div className='w-11/12  m-auto'>
                        <div className='grid grid-cols-3 gap-2'>
                            {data.imgs.map(i => {
                                return (
                                    <div id={i._id} key={i._id} className="flex-shrink-0">
                                        <div key={i.petId} id={i.petId} className='w-32 h-32 overflow-hidden relative'>
                                            <img className='w-full h-full object-contain' src={i.secure_url} alt={i.public_id} />
                                            <button
                                                className='absolute p-1 top-2 left-24 bg-red-800 text-white rounded-full hover:scale-110 transition duration-300'
                                                onClick={handleDltImg}
                                                key={`delete-btn-${i._id}`}
                                            >
                                                <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>



                    {/* Imagenes nuevas */}
                    <div className='w-11/12  m-auto'>
                        <div className='grid grid-cols-3 gap-2'>
                            {addImagenes.length > 0 && (
                                <>
                                    {addImagenes.map((file, index) => (
                                        <div className='w-32 h-32 overflow-hidden relative' key={index}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${index}`}
                                                className='w-full h-full object-contain'
                                            />
                                            <button
                                                className='absolute p-1 top-2 left-24 bg-red-800 text-white rounded-full hover:scale-110 transition duration-300'
                                                onClick={() => handleDelete(index)}
                                            >
                                                <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                                            </button>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div className=" text-2xl w-11/12 mx-auto mt-2 ">
                        <input type="submit" value="¡Listo!" className="w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>

                </form>
            </>
        );
    }
}

export default UpdtImgPet

