import { useForm } from "react-hook-form";
import { EmailForm } from "../../schema/RegisterUser";
import Errors from "../../components/Errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPass } from "../../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import Cafetera from "../../components/animations/Cafetera";



function ForgotPass() {
    const goMenu = useNavigate()
    const datos: EmailForm = {
        email: ""
    };

    const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>({
        defaultValues: datos
    });

    const { mutate } = useMutation({
        mutationFn: forgotPass,  //Esta es la función que se va a ejecutar cuando llamamos al mutation
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data) //El data es del Backend y en front está en Servicios
            goMenu('/auth/valTokn')
        }
    })

    const onSub = (data: EmailForm) => {
        mutate(data);
    }

    return (
        <>
            <div className="caja h-lvh">
                <div className="pt-36 w-4/5 m-auto">
                    <h1 className="  font-fascinate text-center text-white">Ingresa tu correo</h1>

                    <div className=" w-1/2 mt-20">
                        <form onSubmit={handleSubmit(onSub)} noValidate className="" >
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
                            <input type="submit" value="Enviar" className=" sub mt-4 w-full text-center text-black font-bold text-xl" />
                        </form>

                        <Cafetera />


                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPass