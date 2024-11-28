import { useForm } from "react-hook-form";
import { RegisterUserForm } from "../../schema/RegisterUser";
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { newUser } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../modules/newUser.module.css"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { GiDialPadlock, GiSmartphone } from "react-icons/gi";
import { BsMailboxFlag } from "react-icons/bs";
import { FaUniversity, FaUserGraduate, FaUserTie } from "react-icons/fa";

function NewUser() {

    const [hiden, setHiden] = useState<boolean>(false);

    const Show = () => {
        setHiden(prevHiden => !prevHiden);
    };


    const goToken = useNavigate();

    const initialValues: RegisterUserForm = {
        nombres: '',
        apPat: '',
        apMat: '',
        tel: undefined,
        email: '',
        pass: '',
        pass_confirm: '',
    };

    const { register, getValues, handleSubmit, formState: { errors } } = useForm<RegisterUserForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: newUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            goToken('/user/valAcct')
        }
    })



    const onSub = (formData: RegisterUserForm) => {
        mutate(formData)
    }



    return (
        <>
            <div className={`${styles.cajita}`}>

                <h1 className="  font-fascinate text-center text-white">Ingresa tus datos</h1>

                <div className={`${styles.wrapper} w-1/2 m-auto`}>
                    <form onSubmit={handleSubmit(onSub)} noValidate className="w-11/12 m-auto">
                        {/* Fila de Nombre y Teléfono */}
                        <div className="grid grid-cols-2 w-full gap-4 mb-3">
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Nombre(s)"
                                    {...register('nombres', { required: true })}
                                    className="w-full"
                                />
                                <FaUserTie className={`${styles.icon} absolute right-4`} />
                                {errors.nombres?.type === 'required' && <Errors>{'¡Tu nombre es obligatorio!'}</Errors>}
                            </div>
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Teléfono"
                                    {...register('tel', { required: true })}
                                    className="w-full"
                                />
                                <GiSmartphone className={`${styles.icon} absolute right-4`} />
                                {errors.tel?.type === 'required' && <Errors>{'¡Tu teléfono es obligatorio!'}</Errors>}
                            </div>
                        </div>

                        {/* Fila de Apellidos */}
                        <div className="grid grid-cols-2 w-full gap-4 mb-3">
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Apellido Paterno"
                                    {...register('apPat', { required: true })}
                                    className="w-full"
                                />
                                <MdDriveFileRenameOutline className={`${styles.icon} absolute right-4`} />
                                {errors.apPat?.type === 'required' && <Errors>{'¡Tu apellido es obligatorio!'}</Errors>}
                            </div>
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="text"
                                    placeholder="Apellido Materno"
                                    className="w-full"
                                />
                                <MdDriveFileRenameOutline className={`${styles.icon} absolute right-4`} />
                            </div>
                        </div>

                        {/* Campo de Correo */}
                        <div className="w-full mb-3">
                            <div className={`${styles.inputBox} relative`}>
                                <input
                                    type="email"
                                    placeholder="Correo"
                                    {...register("email", {
                                        required: "¡Tu Correo es obligatorio!",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "E-mail no válido",
                                        },
                                    })}
                                    className="w-full"
                                />
                                <BsMailboxFlag className={`${styles.icon} absolute right-4`} />
                                {errors.email && (<Errors>{errors.email?.message}</Errors>)}
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

                        {/* Botón de Enviar */}
                        <div className=" text-center">
                            <input type="submit" value="Enviar" className={`${styles.sub} w-1/2 text-2xl text-black font-bold`} />
                        </div>
                    </form>


                </div >
            </div >
        </>
    )
}

export default NewUser