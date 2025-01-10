import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CitaForm } from "../../schema/Meetings";
import Errors from "../Errors";
import dayjs from "dayjs";
import { validateDate, validateTime } from "../../util/Valid";
import { toast } from "react-toastify";
import { getMtngId } from "../../Api/AdmindApi";

type UpdtMtngProps = {
    idCita: string;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdtMtgn = ({ idCita, setVisible }: UpdtMtngProps) => {
    //---------------> Controladores del UseMutation y useQuery <---------------
    const { data, isLoading, isError } = useQuery({
        queryKey: ['UsrsMtng', idCita],
        queryFn: () => getMtngId(idCita),
        retry: 1
    });

    //Va a actualizar los datos
    const qc = new QueryClient();
    const { mutate } = useMutation({
        mutationFn: getMtngId,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            qc.invalidateQueries({ queryKey: ['Meetings'] })
            qc.invalidateQueries({ queryKey: ['Mtng', idCita] })
            setVisible(false);
        }
    })
    //---------------> Controladores para el FORM <---------------
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CitaForm>({
        defaultValues: {
            fecha: dayjs().format('YYYY-MM-DD'),
            hora: dayjs().format('HH:mm'),
            motivo: "",
            comentarios: "",
            alias: "",
        }
    });

    //---------------> useEffect para actualizar datos cuando 'data' cambie <---------------
    useEffect(() => {
        if (data) {
            setValue("motivo", data.motivo!);
            setValue("fecha", dayjs(data.fecha).format('YYYY-MM-DD'));
            setValue("hora", dayjs(data.hora, ['h:mm A', 'h:mm']).format('HH:mm'));
            setValue("comentarios", data.comentarios!);
            setValue("alias", data?.alias || "");
        }
    }, [data, setValue]); 

    // Función de submit
    const onSub = (formData: CitaForm) => {
        const datos = {
            formData, idCita
        }; 
    };

    // Mostrar mensajes de carga o error
    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <p>Hubo problemas</p>;
 
    return (
        <div>
            <h2 className="text-center font-fascinate">Asignar veterinario</h2>

            <form onSubmit={handleSubmit(onSub)} noValidate>
                <div className=" grid grid-cols-2 gap-4">
                    {/* Fecha */}
                    <div>
                        <label className="w-full text-center">Fecha</label>
                        <input
                            type="date"
                            className=" text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                            {...register('fecha', {
                                required: 'La fecha es obligatoria',
                                validate: validateDate // Usamos la función importada para validar
                            })}
                        />
                        {errors.fecha && <Errors>{errors.fecha.message}</Errors>}
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="w-full text-center">Hora</label>
                        <input
                            type="time"
                            className=" text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                            {...register('hora', {
                                required: 'La hora es obligatoria',
                                validate: validateTime
                            })}
                        />

                        {errors.hora && (
                            <>
                                <Errors>{errors.hora.message}</Errors>
                                {toast.error('Solo se permiten intervalos de 30 minutos.')}
                            </>
                        )}

                    </div>
                </div>


                <div className="mt-2">
                    {/* Motivo */}
                    <label className="w-full text-center">Motivo</label>
                    <select
                        className="text-black w-full border-2 border-cyan-500 p-1 rounded-lg"
                        {...register('motivo', { required: 'El motivo es obligatorio' })}
                    >
                        <option value="veterinario">Veterinario</option>
                        <option value="dar en adopcion">Dar en adopción</option>
                        <option value="adoptar">Adoptar</option>
                    </select>
                    {errors.motivo && <Errors>{errors.motivo.message}</Errors>}

                    {/* Alias */}
                    {watch('motivo') !== 'Dar en adopcion' && (
                        <div className="mt-1">
                            <label className="w-full text-center">Mascota</label>
                            <input
                                type="text"
                                placeholder="Nombre de la mascota"
                                className="text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                                {...register('alias', { required: false})}
                            /> 
                        </div>
                    )}
                </div>

                {/* Comentarios */}
                <div className="mt-2">
                    <label className="w-full text-center">Comentarios</label>
                    <textarea
                        placeholder="Escribe tu mensaje aquí..."
                        className="text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                        {...register('comentarios', { required: 'Los comentarios son obligatorios' })}
                    />
                    {errors.comentarios && <Errors>{errors.comentarios.message}</Errors>}
                </div>

                <div className="text-center m-3">
                    <input type="submit" value="¡Listo!" className="w-1/2 text-2xl text-black font-bold" />
                </div>
            </form>
        </div>
    );
};

export default UpdtMtgn;

