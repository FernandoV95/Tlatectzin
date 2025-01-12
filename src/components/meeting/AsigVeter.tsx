import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { assignVeter, vetersAvailable } from "../../Api/AdmindApi";
import { CitaAdmindForm, idForm } from "../../schema/Meetings";

import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateDate, validateTime } from "../../util/Valid";
import Errors from "../Errors";
import { VeterFrom } from "../../schema/Users";

type AsigVeterProp = {
    idCita: idForm['_id'];
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AsigVeter({ idCita, setVisible }: AsigVeterProp) {

    //vamos a traer los datos de esta cita

    const { data, isLoading, isError } = useQuery({
        queryKey: ['mtgnAdmind', idCita],
        queryFn: () => vetersAvailable({ idCita }),
        enabled: !!idCita,
    });

    // Controladores para el formulario
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CitaAdmindForm>({
        defaultValues: {
            _id: '',  // Dejamos _id vacío porque lo estableceremos después
            fecha: dayjs().format('YYYY-MM-DD'),
            hora: dayjs().format('HH:mm'),
            veterinario: {
                _id: '',
                nombres: ''
            }
        }
    });


    //Va a actualizar los datos
    const qc = new QueryClient();
    const { mutate } = useMutation({
        mutationFn: assignVeter,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            qc.invalidateQueries({ queryKey: ['getMeetings'] })
            qc.invalidateQueries({ queryKey: ['Mtng', idCita] })
            setVisible(false);
        }
    })

    const [toastDisplayed, setToastDisplayed] = useState(false);


    useEffect(() => {
        if (data) {
            setValue("fecha", dayjs(data?.fecha).format('YYYY-MM-DD'));
            setValue("hora", dayjs(data?.hora, ['h:mm A', 'h:mm']).format('HH:mm'));
            const veterinario = data?.veterAvlbl[0] ? {
                _id: data.veterAvlbl[0]._id,
                nombres: data.veterAvlbl[0].nombres
            } : { _id: '', nombres: '' };

            setValue('veterinario', veterinario);
        }
    }, [data, setValue]);

    useEffect(() => {
        if (errors.hora && !toastDisplayed) {
            toast.error('Solo se permiten intervalos de 30 minutos.');
            setToastDisplayed(true);
        }
    }, [errors.hora, toastDisplayed]);

    if (isLoading) return <div><p className="text-white">Cargando....</p></div>;

    if (isError) return <p>Hubo problemas al cargar los datos</p>;

    const onSub = (formData: CitaAdmindForm) => {
        // Aquí ya tienes el _id dentro de formData
        mutate({ formData, idCita });
    };





    if (data) return (
        <>
            <form noValidate onSubmit={handleSubmit(onSub)}>
                <h2 className=" text-center">Asignar Veterinario</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Fecha */}
                    <div>
                        <label className="w-full text-center">Fecha</label>
                        <input
                            type="date"
                            className="text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                            {...register('fecha', {
                                required: 'La fecha es obligatoria',
                                validate: validateDate
                            })}
                        />
                        {errors.fecha && <Errors>{errors.fecha.message}</Errors>}
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="w-full text-center">Hora</label>
                        <input
                            type="time"
                            className="text-black w-full border-2 border-cyan-500 rounded-lg p-1"
                            {...register('hora', {
                                required: 'La hora es obligatoria',
                                validate: validateTime
                            })}
                        />
                        {errors.hora && (
                            <>
                                <Errors>{errors.hora.message}</Errors>
                            </>
                        )}
                    </div>
                </div>

                {/* Asignar Veterinario */}
                <div>
                    <label className="w-full text-center">Veterinario</label>
                    <select
                        className="text-black w-full border-2 border-cyan-500 p-1 rounded-lg"
                        {...register('veterinario', { required: 'El veterinario es obligatorio' })}
                    >
                        {data?.veterAvlbl.map(({ _id, nombres }: VeterFrom, index: number) => (
                            <option key={index} value={_id}>
                                {nombres}
                            </option>
                        ))}
                    </select>
                    {errors.veterinario && <Errors>{errors.veterinario.message}</Errors>}
                </div>

                <div className="text-center m-3">
                    <input type="submit" value="¡Listo!" className="w-1/2 text-2xl text-black font-bold" />
                </div>
            </form>
        </>
    );
}
