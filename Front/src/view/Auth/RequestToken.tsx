import { useNavigate } from "react-router-dom";
import { EmailForm } from "../../schema/RegisterUser";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestToken } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { FaEnvelope } from 'react-icons/fa';
import styles from '../../modules/requestTkn.module.css'
import Errors from "../../components/Errors";
import Cafetera from "../../components/animations/Cafetera";

function RequestToken() {

    const goToken = useNavigate()
    const datos: EmailForm = {
        email: ""
    };

    const { register, reset, handleSubmit, formState: { errors } } = useForm<EmailForm>({
        defaultValues: datos
    });

    const { mutate } = useMutation({
        mutationFn: requestToken,  //Esta es la función que se va a ejecutar cuando llamamos al mutation
        onError: (error) => {
            toast.error(error.message)
            reset()
        },
        onSuccess: (data) => {
            toast.success(data) //El data es del Backend y en front está en Servicios
            goToken('/user/valAcct')
        }
    })



    const onSub = (data: EmailForm) => {
        mutate(data);
    }
    return (
        <>
            <div className={`${styles.cajita} h-lvh`}>
                <div className="pt-36 w-4/5 m-auto">
                    <h1 className="  font-fascinate text-center text-white">Solicita un nuevo Codigo</h1>

                    <div className=" w-1/2 mt-20">

                        <Cafetera />
                        <form onSubmit={handleSubmit(onSub)} noValidate >
                            <div className=" flex flex-col mt-3">
                                <div className="relative">
                                    <input id="email" type="email" placeholder="Email" className="input-field  " {...register("email", {
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

                            <div className=" flex justify-center ">
                                <input type="submit" value="Iniciar" className={`${styles.sub} w-1/2 mt-3 text-black font-bold text-xl `} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestToken