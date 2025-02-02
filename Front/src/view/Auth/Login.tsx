import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../schema/Users";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Errors from "../../components/Errors";
import { useState } from "react";
import { FaLock, FaUser } from 'react-icons/fa';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Taza from "../../components/animations/TAza";
import styles from '../../modules/login.module.css'
import { login } from "../../Api/AuthApi";



export default function Login() {

    const [hiden, setHiden] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const Show = () => {
        setHiden(prevHiden => !prevHiden);
    };

    const goMenu = useNavigate();

    const initialValues: LoginForm = {
        email: '',
        pass: '',
    };

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        defaultValues: initialValues
    });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Bienvenido')
            queryClient.refetchQueries({ queryKey: ['perfil'] })
            goMenu('/')
        }
    })



    const onSub = (formData: LoginForm) => {
        mutate(formData)
    }
    return (
        <>
            <div className={` ${styles.cajita}  `}>
                <h1 className=" pt-16 pb-16  font-fascinate text-center text-white">Inicia Sesión</h1>

                <div className="grid grid-cols-2 w-3/4 m-auto ">

                    <div >
                        <Taza />
                    </div>

                    <div className="  ">
                        <form onSubmit={handleSubmit(onSub)} noValidate>
                            <div className="flex flex-col">
                                <div className="relative">
                                    <input id="email" type="email" placeholder="Email" className="input-field  "{...register("email", {
                                        required: "¡Tu Correo es obligatorio!",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "E-mail no válido",
                                        },
                                    })} />
                                    <FaUser className="absolute left-4 top-5 text-white" />
                                    {errors.email?.type === 'required' && <Errors>{'¡Tu correo es obligatorio!'}</Errors>}
                                </div>
                            </div>

                            <div className="flex flex-col mt-3">
                                <div className="relative">
                                    <input id="pass" type={hiden ? 'text' : 'password'} placeholder="contraseña" className="input-field" {...register('pass', { required: true })} />
                                    <FaLock className="absolute left-4 top-5  text-white" />
                                    {hiden ?
                                        <i className="bi bi-eye-slash-fill absolute text-2xl top-2 right-2 z-20 hover:cursor-pointer" onClick={Show}></i>
                                        :
                                        <i className="bi bi-eye-fill absolute text-2xl top-2 right-2 z-20 hover:cursor-pointer" onClick={Show}></i>
                                    }

                                    {errors.pass?.type === 'required' && <Errors>{'¡La contraseña es obligatoria!'}</Errors>}
                                </div>
                            </div>

                            <div className=" flex justify-center ">
                                <input type="submit" value="Iniciar" className={`${styles.sub} w-1/2 mt-3 text-black font-bold text-xl `} />
                            </div>
                        </form>
                    </div>

                </div>

                <div className=" w-1/2 m-auto ">
                    <div className=" w-4/5 m-auto flex justify-between text-white text-lg mt-4 relative">
                        <Link to={"/auth/sendCod"}
                            className="no-underline text-white transform  hover:scale-110 transition-transform duration-200" >
                            ¿Olvidate tu contraseña?
                        </Link>
                        <Link to={"/auth/valAcct"}
                            className="no-underline text-white transform  hover:scale-110 transition-transform duration-200" >
                            Valida tu cuenta
                        </Link>
                    </div>

                    <div className="w-4/5 m-auto text-white text-lg flex justify-center">
                        <p>¿No tienes cuenta?&nbsp;&nbsp;</p>
                        <Link
                            to="/user/new"
                            className="no-underline text-white transform hover:scale-110 transition-transform duration-200"
                        >
                            Crear cuenta
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
