import { useForm } from "react-hook-form"; 
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { newUser } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../modules/newUser.module.css" 
import { GiDialPadlock} from "react-icons/gi"; 
import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import FormUSer from "../../components/FormUser/FormUSer";
import { NewVeterForm } from "../../schema/Users";

function NewVeterinary() {

    const [hiden, setHiden] = useState<boolean>(false);

    const Show = () => {
        setHiden(prevHiden => !prevHiden);
    };


    const goToken = useNavigate();

    const initialValues: NewVeterForm = {
        nombres: '',
        apPat: '',
        apMat: '',
        tel: '',
        email: '',
        pass: '',
        pass_confirm: '',
        universidad:'',
        cedula:''
    };

    const { register, getValues, handleSubmit, formState: { errors } } = useForm<NewVeterForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: newUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            goToken('/user/newVeter')
        }
    })



    const onSub = (formData: NewVeterForm) => {
        mutate(formData)
    }



    return (
        <>
            <div className={`${styles.cajita}`}>

                <h1 className="  font-fascinate text-center text-white">Ingresa tus datos</h1>

                <div className={`${styles.wrapper} w-1/2 m-auto`}>
                    <form onSubmit={handleSubmit(onSub)} noValidate className="w-11/12 m-auto">
                        <FormUSer
                            errors={errors}
                            register={register}
                        />

                        {/* Fila de Universidad & cedula */}
                        <div className="grid grid-cols-2 w-full gap-4 mb-3">
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Universidad"
                                    {...register('universidad', { required: true })}
                                    className="w-full"
                                />
                                <FaUniversity className={`${styles.icon} absolute right-4`} />
                                {errors.universidad?.type === 'required' && <Errors>{'¡Ingresa tu universidad!'}</Errors>}
                            </div>
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Cedula"
                                    {...register('cedula', { required: true })}
                                    className="w-full"
                                />
                                <FaUserGraduate className={`${styles.icon} absolute right-4`} />
                                {errors.cedula?.type === 'required' && <Errors>{'¡Tu cedula es necesaria!'}</Errors>}
                            </div>
                        </div>


                        {/* Campo de Contraseña */}
                        <div className="grid grid-cols-2 w-full gap-4 mb-3">
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type={hiden ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    {...register('pass', { required: true })}
                                />
                                <GiDialPadlock className={`${styles.icon} absolute right-4`} />
                                {errors.pass?.type === 'required' && <Errors>{'¡Tu contraseña es obligatoria!'}</Errors>}
                            </div>
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type={hiden ? 'text' : 'password'}
                                    placeholder="Repetir Contraseña"
                                    {...register("pass_confirm", {
                                        required: "¡Repite tu contraseña!",
                                        validate: v => v === getValues('pass') || "¡La contraseña no coincide!"
                                    })}
                                />
                                <GiDialPadlock className={`${styles.icon} absolute right-4`} />
                                {errors.pass_confirm && <Errors>{errors.pass_confirm.message}</Errors>}
                            </div>
                        </div>

                        {/* Mostrar/ocultar Contraseña */}
                        <div className="flex gap-2 justify-center ">
                            {hiden ? (
                                <i className="bi bi-eye-slash-fill text-sm text-white hover:cursor-pointer" onClick={Show}></i>
                            ) : (
                                <i className="bi bi-eye-fill text-sm text-white hover:cursor-pointer" onClick={Show}></i>
                            )}
                            <p className="text-sm text-white">Mostrar contraseña</p>
                        </div>
                        <div className=" text-center">
                            <input type="submit" value="Enviar" className={` ${styles.sub} w-1/2 text-2xl text-black font-bold`} />
                        </div>
                    </form>


                </div >
            </div >
        </>
    )
}

export default NewVeterinary