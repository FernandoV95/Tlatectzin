import { useForm } from "react-hook-form";
import Fecha from "../../components/citas/Fecha";
import { useEffect, useState } from "react";
import Errors from "../../components/Errors";
import { FaPaw, FaRegClock, FaStickyNote } from "react-icons/fa";
import Horario from "../../components/citas/Horario"; 
import { CitaForm } from "../../schema/Meetings";
import { useMutation } from "@tanstack/react-query";
import { nwMeeting } from "../../Api/MeetingApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function NewCitas() {
    const goMenu = useNavigate();
    const [veterinario, setVeterinario] = useState(false);
    const [hizuke, setHizuke] = useState<string>('');
    const [horario, setHorario] = useState<string>('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setVeterinario(value === 'veterinario');
    }; 

    const datosIniciales:CitaForm = {
        fecha: "",
        hora: "",
        motivo: "",
        comentarios: "",
        alias: "",
    };

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ defaultValues: datosIniciales });

    useEffect(() => {
        if (hizuke) {
            setValue('fecha', hizuke );
        }
        if (horario) {
            setValue('hora', horario); 
        }
    }, [hizuke, horario, setValue]);

    const { mutate } = useMutation({
        mutationFn: nwMeeting,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            goMenu('/')
        }
    })


    const onSubmit = (formData: CitaForm) => {
        mutate(formData)
    }



    return (
        <div className="fondo h-screen w-full pt-9">
            <h1 className="font-fascinate text-center text-white">Agenda tu cita</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="w-11/12 m-auto grid grid-cols-2 gap-2">
                    <div className="w-full">
                        {/* Fecha */}
                        <Fecha setHizuke={setHizuke} />
                        {errors.fecha && <Errors>{errors.fecha.message}</Errors>}
                        <input
                            type="date"
                            className="absolute -top-10 left-64"
                            value={hizuke}
                            {...register('fecha', { required: '¡Necesitamos una fecha!' })}
                        />
                    </div>

                    <div className="w-full">


                        {/* Selector de Motivo */}
                        <div className="grid grid-cols-2 gap-4 w-11/12 m-auto relative">
                            <select
                                className="input-select rounded-3xl"
                                {...register('motivo', { required: '¿Por qué nos visitas?' })}
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled hidden>Motivo</option>
                                <option className="text-black" value="adoptar">Adoptar</option>
                                <option className="text-black" value="dar en adopcion">Dar en adopción</option>
                                <option className="text-black" value="veterinario">Veterinario</option>
                            </select>
                            {errors.motivo?.type === 'required' && <Errors>{errors.motivo.message}</Errors>}
                            <FaStickyNote className="text-white absolute left-4 top-4 size-5" />
                        </div>

                        {/* Selector de Horario */}
                        <div className="grid grid-cols-2 gap-4 w-11/12 m-auto relative pt-2">
                            <Horario setHorario={setHorario} />
                            <FaRegClock className="text-white absolute left-3 top-5 size-6" />
                            {errors.hora && <Errors>{errors.hora.message}</Errors>}
                            <input
                                type="text"
                                className="absolute bottom-72"
                                value={hizuke}
                                {...register('hora', { required: '¡Necesitamos un horario!' })}
                            />
                        </div>

                        {/*Nombre de tu mascota*/}
                        <div className=" w-11/12 m-auto mt-2  relative">
                            {veterinario && (
                                <>
                                    <input className="input-field mb-2" placeholder="Alias de la mascota" type="text" {...register('alias', { required: true })} />
                                    <FaPaw className=" text-white absolute left-4 top-4 size-5" />
                                    {errors.alias?.type === 'required' && <Errors>¿Como se llama tu mascota?</Errors>}
                                </>
                            )}
                        </div>


                        {/*Comentarios */}
                        <div className=" w-11/12 m-auto mt-2  relative">
                            <textarea className=" w-full m-auto h-32 area" placeholder="Dejanos un  breve mensaje..." {...register('comentarios', { required: false })} />
                        </div>

                    </div>
                </div>



                <div className="flex justify-center">
                    <input type="submit" value="Enviar" className="sub w-4/5 text-center text-black font-bold text-xl mt-3" />
                </div>

            </form>
        </div>

    );
}

export default NewCitas;
