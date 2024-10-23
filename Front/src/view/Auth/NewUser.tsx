import { useForm } from "react-hook-form";
import { RegisterUserForm } from "../../schema/RegisterUser";
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { newUser } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useState } from "react";

function NewUser() {

    const [hiden, setHiden] = useState<boolean>(false);
    const [hiden2, setHiden2] = useState<boolean>(false);

    const Show = () => {
        setHiden(prevHiden => !prevHiden);
    };

    const Show2 = () => {
        setHiden2(prevHiden => !prevHiden);
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
            goToken('/auth/valAcct')
        }
    })



    const onSub = (formData: RegisterUserForm) => {
        mutate(formData)
    }



    return (
        <>
            <div className="caja h-lvh">
                <div className="pt-8">
                    <h1 className="  font-fascinate text-center text-white">Ingresa tus datos</h1>
                    <form onSubmit={handleSubmit(onSub)} noValidate className=" w-2/3 m-auto" >

                        <div className="flex justify-between gap-4">
                            <div className=" flex flex-col mt-3">
                                <div className="relative">
                                    <input id="nombres" type="text" placeholder="Nombre(s)" className="input-field" {...register('nombres', { required: true })} />
                                    <FaUser className="absolute left-4 top-5 text-white" />
                                    {errors.nombres?.type === 'required' && <Errors>{'¡Tu nombre es obligatorio!'}</Errors>}
                                </div>
                            </div>

                            <div className=" flex flex-col mt-3">
                                <div className="relative">
                                    <input id="apPat" type="text" placeholder="Apellido Paterno" className="input-field" {...register('apPat', { required: true })} />
                                    <FaUser className="absolute left-4 top-5 text-white" />
                                    {errors.apPat?.type === 'required' && <Errors>{'¡Tu apellido es obligatorio!'}</Errors>}
                                </div>
                            </div>


                            <div className=" flex flex-col mt-3">
                                <div className="relative">
                                    <input id="apMat" type="text" placeholder="Apellido Materno" className="input-field" />
                                    <FaUser className="absolute left-4 top-5 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 ">
                            <div className=" flex flex-col mt-3 w-1/2">
                                <div className="relative">
                                    <input id="tel" type="tel" placeholder="Telefono" className="input-field" {...register('tel', { required: true })} />
                                    <FaPhone className="absolute left-4 top-5 text-white" />
                                    {errors.tel?.type === 'required' && <Errors>{'¡Tu telefono es obligatorio!'}</Errors>}
                                </div>
                            </div>

                            <div className=" flex flex-col mt-3 w-1/2">
                                <div className="relative">
                                    <input id="email" type="email" placeholder="Ej: corre@dominio.com" className="input-field" {...register("email", {
                                        required: "¡Tu Correo es obligatorio!",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "E-mail no válido",
                                        },
                                    })} />
                                    <FaEnvelope className="absolute left-4 top-5 text-white" />
                                    {errors.email?.type === 'required' && <Errors>{'¡Tu correo es obligatorio!'}</Errors>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 " >
                            <div className=" flex flex-col mt-3 w-1/2">
                                <div className="relative">
                                    <input id="pass" type={hiden ? 'text' : 'password'} placeholder="Contraseña" className="input-field" {...register('pass', { required: true })} />
                                    <FaLock className="absolute left-4 top-5 text-white" />
                                    {hiden ?
                                        <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                                        :
                                        <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show}></i>
                                    }
                                    {errors.pass?.type === 'required' && <Errors>{'¡Tu contraseña es obligatoria!'}</Errors>}
                                </div>
                            </div>


                            <div className=" flex flex-col mt-3 w-1/2">
                                <div className="relative">
                                    <input id="pass_confirm" type={hiden2 ? 'text' : 'password'} placeholder="Repite tu contraseña" className="input-field" {...register("pass_confirm",
                                        {
                                            required: "¡Repite tu contraseña!",
                                            validate: v => v === getValues('pass') || "¡Las contraseñas no coinciden!"
                                        })} />
                                    <FaLock className="absolute left-4 top-5 text-white" />
                                    {hiden2 ?
                                        <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show2}></i>
                                        :
                                        <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 hover:cursor-pointer" onClick={Show2}></i>
                                    }
                                    {errors.pass_confirm && <Errors>{errors.pass_confirm.message}</Errors>}
                                </div>
                            </div>
                        </div>

                        {/*------------------------------------ */}

                        <input type="submit" value="Registrar" className=" sub mt-2 w-full text-center text-black font-bold text-xl" />

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewUser