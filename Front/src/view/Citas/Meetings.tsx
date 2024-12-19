import styles from "../../modules/Citas.module.css"
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LuDog } from "react-icons/lu";
import { FaQuestion } from "react-icons/fa";
import { FaHandHoldingHeart } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import { GiDogHouse } from "react-icons/gi";
import { useForm } from "react-hook-form";
import Errors from "../../components/Errors";
import { obtFch, obtHora } from "../../util/Mouth";
import { CitaForm } from "../../schema/Meetings";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { nwMeeting } from "../../Api/MeetingApi";

export default function Meetings() {
    const [myMot, setMyMot] = useState("Dar en Adopción");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const goMenu = useNavigate();

    const datos: CitaForm = {
        fecha: '',
        hora: '',
        motivo: myMot,
        comentarios: '',
        alias: '',
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: datos
    });


    const weekend = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // No permitir los fines de semana
    };

    const getIcon = () => {
        switch (myMot) {
            case 'Veterinario':
                return <MdLocalHospital className={`${styles.icon1}`} />;
            case 'Adoptar':
                return <GiDogHouse className={`${styles.icon1}`} />;
            default:
                return <FaHandHoldingHeart className={`${styles.icon1}`} />;
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    useEffect(() => {
        if (selectedDate) {
            setValue('fecha', obtFch(selectedDate.toString()));
            setValue('hora', obtHora(selectedDate.toString()));
        }
    }, [selectedDate, setValue]);

 


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

    const onSub = (formData: CitaForm) => {
        mutate(formData)
    }



    return (
        <>
            <div className={`${styles.cajita} pt-4`}>
                <div className={`${styles.wrapper} m-auto `}>
                    <form onSubmit={handleSubmit(onSub)} noValidate >
                        <h1 className="font-fascinate text-center">Agenda tu Cita</h1>
                        <div className="grid grid-cols-2 justify-center items-center" >

                            <div >
                                <div className="">
                                    <label>Motivo de tu visita</label>
                                    <div className="flex flex-row justify-center items-center">
                                        <select
                                            value={myMot}
                                            {...register('motivo', { required: true })}
                                            onChange={e => { setMyMot(e.target.value) }}
                                            className={`${styles.inputBox1}`}>
                                            <option value="Dar en Adopción">Dar en Adopción</option>
                                            <option value="Adoptar">Adoptar</option>
                                            <option value="Veterinario">Veterinario</option>
                                        </select>
                                        {getIcon()}
                                    </div>
                                </div>

                                {myMot === "Veterinario" && (
                                    <div className={`${styles.inputBox} relative`}>
                                        <input
                                            type="text"
                                            required={myMot === "Veterinario"} // Solo es obligatorio si el motivo es "Veterinario"
                                            {...register('alias', { required: myMot === "Veterinario" })}
                                        />
                                        <div className={`${styles.labelline}`}>Alias de la Mascota</div>
                                        <LuDog className={`${styles.icon}`} />
                                        <div className=" absolute top-12 w-full">
                                            {errors.alias?.type === 'required' && <Errors>{'¿Como se llama tu mascota?'}</Errors>}
                                        </div>
                                    </div>
                                )}

                                {myMot === "Adoptar" && (
                                    <div className={`${styles.inputBox} relative`}>
                                        <input
                                            type="text"
                                            required={myMot === "Adoptar"} // Solo es obligatorio si el motivo es "Veterinario"
                                            {...register('alias', { required: myMot === "Adoptar" })}
                                        />
                                        <div className={`${styles.labelline}`}>Mascota de interes</div>
                                        <LuDog className={`${styles.icon}`} />
                                        <div className=" absolute top-12 w-full">
                                            {errors.alias?.type === 'required' && <Errors>{'¿Como se llama tu mascota?'}</Errors>}
                                        </div>
                                    </div>
                                )}

                                <div className={`${styles.inputBox}`}>
                                    <input type="text" required {...register('comentarios', { required: true })} />
                                    <div className={`${styles.labelline}`}>Comentarios</div>
                                    <FaQuestion className={`${styles.icon}`} />
                                    <div className=" absolute top-12 w-full">
                                        {errors.comentarios?.type === 'required' && <Errors>{'¡Deja un comentario!'}</Errors>}
                                    </div>
                                </div>

                            </div>



                            <div className=" text-center">
                                <DatePicker
                                    selected={selectedDate} // Estado de la fecha seleccionada
                                    onChange={handleDateChange} // Llama a handleDateChange cuando cambia la fecha
                                    showTimeSelect 
                                    timeCaption="Hora"
                                    filterDate={weekend}
                                    inline
                                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                    minTime={new Date(0, 0, 0, 8, 0)}
                                    maxTime={new Date(0, 0, 0, 20, 0)}
                                />
                                <input className=" hidden " type="text" {...register('fecha', { required: true })} />
                                <input className=" hidden " type="text" {...register('hora', { required: true })} />
                                {(errors.fecha?.type === 'required' || errors.hora?.type === 'required') && <Errors>{'¿...Y la fecha padrino?'}</Errors>}
                            </div>

                        </div>

                        <div className=" text-center m-3 ">
                            <input type="submit" value="Enviar" className={`${styles.sub} w-1/2 text-2xl text-black font-bold`} />
                        </div>
                    </form>
                </div >
            </div >

            <div className="absolute top-48 -right-10 w-64">
                <img
                    title="Maribel Mamasita Guardia"
                    src="/maribel.png"
                    alt="Maribel Mamasita Guardia"
                    onClick={() => window.open('https://www.youtube.com/shorts/CgsAIIG0B-0', '_blank')}
                    className="cursor-pointer hover:scale-110 transition-all duration-300"
                />
            </div>
        </>
    )
}
