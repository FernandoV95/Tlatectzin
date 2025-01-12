import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { idForm, PetForm, updtDataPetForm } from "../../schema/Pets"
import { shwPetsID, updtDataPetID } from "../../Api/PetsApi";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Errors from "../../components/Errors";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

type updtPetProps = {
  idPet: idForm['_id']
  setCambiarVentana: React.Dispatch<React.SetStateAction<boolean>>;
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

  const { mutate } = useMutation({
    mutationFn: updtDataPetID,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['Pets'] })
      queryClient.invalidateQueries({ queryKey: ['mascota', idPet] })
      setCambiarVentana(true)
    }
  })

  //Inicializar valores
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PetForm>({
    defaultValues: {
      "alias": "",
      "status": "",
      "tipo": "",
      "vacunas": [],
      "shortDesc": "",
      "longDesc": "",
    }
  });

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

  const [vacunas, setVacunas] = useState<string[]>([]);
  const [nuevaVacuna, setNuevaVacuna] = useState<string>('');

  useEffect(() => {
    if (data?.vacunas) {
      setVacunas(data.vacunas.map((i: string) => i));
    }
  }, [data]);


  if (isLoading) return <div><p>Cargando....</p></div>;
  if (isError) return <p>Hubo problemas con el servidor</p>;

  // Función para leer una nueva vacuna
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaVacuna(event.target.value.toLowerCase());
  };

  //Funcion para almacenar las vacunas
  const addVaccines = () => {
    if (nuevaVacuna && !vacunas.includes(nuevaVacuna)) {  // Evita vacunas duplicadas
      setVacunas([...vacunas, nuevaVacuna]);
      setNuevaVacuna(''); 

    }
  };

  //Funcion para borrar una vacuna
  const deleteVaccines = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const aux = vacunas.filter(i => i !== e.currentTarget.value);
    setVacunas(aux);
  };

  //Eniva el formulario actualizado
  const onSub = (formData: updtDataPetForm) => {
    formData.vacunas = vacunas; 
    const datos = {
      formData, idPet
    };
    mutate(datos)
  }

  if (data) return (
    <div>
      <form onSubmit={handleSubmit(onSub)}>

        <div className=' grid grid-cols-2 w-11/12 gap-2 mb-2'>
          {/* Nombre de la mascota */}
          <div>
            <label className='w-full text-center'>Alias</label>
            <input className='text-black p-1 w-full border-2 border-cyan-600 rounded-lg'
              {...register('alias', { required: '¿Como se llama?' })}
              placeholder="Nombre de la mascota" />
            {errors.alias && <Errors>{errors.alias.message}</Errors>}
          </div>

          {/* Estado de la mascota */}
          <div className="w-full text-center">
            <label className='w-full text-center'>Estado</label>
            <select
              className="w-full border-2 border-cyan-600 p-1 rounded-lg"
              {...register('status', { required: '¡Situacion actual!' })}
            >
              <option value="adoptado">Adoptado</option>
              <option value="pendiente">Pendiente</option>
              <option value="perecio">Pereció</option>
            </select>
          </div>
        </div>

        {/* Descripcion corta*/}
        <div>
          <label className='w-full text-center'>Descripcion corta</label>
          <input className='text-black w-11/12 m-auto mb-2 border-2 border-cyan-600 rounded-lg p-1'
            {...register('shortDesc', { required: '¡Necesitamos una breve descripcion!' })}
            placeholder="Descripción corta" />
            {errors.shortDesc && <Errors>{errors.shortDesc.message}</Errors>}
        </div>

        {/* Descripcion larga */}
        <div className='w-full m-auto'>
          <label className='w-full text-center'>Descripcion larga</label>
          <textarea rows={3} className='w-11/12 m-auto border-2 border-cyan-600 mb-2 rounded-lg'
            placeholder="Descripción larga"
            {...register('longDesc', { required: '¡Necesitamos mas contexto!' })}
          />
          {errors.longDesc && <Errors>{errors.longDesc.message}</Errors>}
        </div>

        {/* Vacunas */}
        <label className='w-full text-center'>Vacunas</label>

        <div className=' w-11/12 flex justify-center '>
          <input type="text" onChange={handleInputChange}
            className='text-black p-1 w-full border-2 border-cyan-600 rounded-lg'
            placeholder="Otra vacuna"
            value={nuevaVacuna}
          />
          <button type="button" onClick={addVaccines} className="bg-green-500 text-white p-2 rounded">
            <PlusOutlined />
          </button>
        </div>

        <div className="grid grid-cols-3 overflow-y-auto max-h-24">
          {vacunas.map((v: string, index: number) => (
            <div key={index} className="flex gap-2 mb-2 mt-2">
              <button
                type="button"
                value={v}
                onClick={deleteVaccines}
                className="bg-red-500 text-white px-1 rounded"
              >
                <DeleteOutlined />
              </button>
              <div className="w-24 border-1 border-cyan-600 rounded p-1">{v}</div>
            </div>
          ))}
        </div>


        <div className="flex justify-end mt-4">
          <input type="submit" value="¡Listo!"
            className="w-1/3 border-cyan-500 p-1 rounded-lg text-xl text-black font-bold"
          />
        </div>


      </form>
    </div>
  )
}

export default UpdtPet