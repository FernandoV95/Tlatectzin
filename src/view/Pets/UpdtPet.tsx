import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { shwPetsID, updtDataPetID } from '../../Api/PetsApi';
import { useForm, useFieldArray } from 'react-hook-form';
import { idForm, PetForm, updtDataPetForm } from "../../schema/Pets";
import { useEffect } from 'react';
import Errors from '../../components/Errors';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

type updtPetProps = {
    idPet: idForm['_id']
    setCambiarVentana:React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdtPet({ idPet, setCambiarVentana }: updtPetProps) {
    // Obtener los datos de la mascota por su ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ['mascota', idPet],
        queryFn: () => shwPetsID(idPet),
        retry: 3,
    });

    //Actualizar los datos
    const queryClient = useQueryClient();
    
    const {mutate} = useMutation({
         mutationFn: updtDataPetID,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['Pets']})
            queryClient.invalidateQueries({queryKey:['mascota', idPet]})
            setCambiarVentana(true)
        }
    })

    // Configurar el formulario con React Hook Form
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<PetForm>({
        defaultValues: { 
            "alias": "",
            "status": "",
            "tipo": "",
            "vacunas": [],
            "shortDesc": "",
            "longDesc": "",
        }
    });

    // Usar useFieldArray para manejar un array dinámico de vacunas
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vacunas",
    });

    // Actualizar valores en el formulario cuando se reciben los datos
    useEffect(() => {
        if (data) {
            setValue('_id', data._id || "");
            setValue('alias', data.alias || "");
            setValue('status', data.status || "");
            setValue('tipo', data.tipo || "");
            setValue('vacunas', data.vacunas || []);
            setValue('shortDesc', data.shortDesc || "");
            setValue('longDesc', data.longDesc || "");
        }
    }, [data, setValue]);

    // Cargando o error
    if (isLoading) return <div><p>Cargando....</p></div>;
    if (isError) return <p>Hubo problemas con el servidor</p>;

    //Añade una nueva vacuna al array
    const addVacuna = () => append("");
    //Quita una vacuna
    const removeVacuna = (index: number) => remove(index); // Eliminar vacuna por índice

    const onSub = (formData:updtDataPetForm) => {
        const datos ={
            formData, idPet
        }
        mutate(datos)
    }

    //Convertir a minusculas
    const minusculas = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        input.value = input.value.toLowerCase();
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit(onSub)}>
                <div className=' grid grid-cols-2 w-11/12 gap-2 mb-2'>
                    {/* Nombre de la mascota */}
                    <div>
                        <label className='w-full text-center'>Alias</label>
                        <input className='text-black p-1 w-full border-2 border-cyan-600 rounded-lg' {...register("alias")} placeholder="Nombre de la mascota" />
                    </div>

                    {/* Estado de la mascota */}
                    <div className="w-full text-center">
                        <label className='w-full text-center'>Estado</label>
                        <select
                            className="w-full border-2 border-cyan-600 p-1 rounded-lg"
                            {...register('status', { required: 'Cual es su rol' })}
                        >
                            <option value="adoptado">Adoptado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="perecio">Pereció</option>
                        </select>
                        {errors.status && <Errors>{errors.status.message}</Errors>}
                    </div>
                </div>

                {/* Descripcion corta*/}
                <div>
                    <label className='w-full text-center'>Descripcion corta</label>
                    <input className='text-black w-11/12 m-auto mb-2 border-2 border-cyan-600 rounded-lg p-1' {...register("shortDesc")} placeholder="Descripción corta" />
                </div>

                {/* Descripcion larga */}
                <div className='w-full m-auto'>
                    <label className='w-full text-center'>Descripcion larga</label>
                    <textarea rows={3} className='w-11/12 m-auto border-2 border-cyan-600 mb-2 rounded-lg' {...register("longDesc")} placeholder="Descripción larga" />

                </div>

                {/* Listado de Vacunas con inputs dinámicos */}
                <div className="">
                    <div className=' w-11/12 flex justify-center '>
                        <label className='w-full text-center'>Vacunas</label>
                        <button type="button" onClick={addVacuna} className="bg-green-500 text-white p-2 rounded">
                            <PlusOutlined />
                        </button>
                    </div>

                    <div className='w-11/12 border-2 border-cyan-600 p-1 rounded-lg mb-2'>
                        {fields.map((item, index) => (
                            <div key={index} className="mb-2   ">
                                <input
                                    {...register(`vacunas.${index}`)}
                                    defaultValue={item.id}
                                    placeholder="Vacuna"
                                    className="mr-2 p-2 border border-gray-300 rounded-lg text-black"
                                    onInput={minusculas}
                                />
                                <button type="button" onClick={() => removeVacuna(index)} className="bg-red-500 text-white p-1 rounded">
                                    <DeleteOutlined />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="flex justify-end mt-4">
                    <input
                        type="submit"
                        value="¡Listo!"
                        className="w-1/3 border-cyan-500 p-1 rounded-lg text-xl text-black font-bold"
                    />
                </div>


            </form>
        </div>
    );
}

export default UpdtPet;
